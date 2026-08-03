import { randomUUID } from 'node:crypto';
import { calculateProspectScore } from '../utils/score.js';
import type { CompanyRecord, NewsRecord, SearchResponse } from '../types/search.js';
import { buildCompanyPayload } from './company.service.js';
import { buildOutreach } from './outreach.service.js';
import { saveCompany, saveContacts, saveSearchHistory, getSavedCompanyWithContacts } from '../supabase/repository.js';

function toTitleCase(value: string) {
  return value
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export async function searchCompany(company: string): Promise<SearchResponse> {
  const normalizedCompany = toTitleCase(company);

  try {
    const cached = await getSavedCompanyWithContacts(normalizedCompany);
    if (cached) {
      await saveSearchHistory(normalizedCompany);
      return {
        company: cached.company,
        contacts: cached.contacts,
        news: [
          {
            title: cached.company.ai_headline || `${normalizedCompany} wins market recognition`,
            age: 'Recent',
            useCase: 'Loaded from local history cache',
            urlLabel: 'Read',
          }
        ],
        email: {
          subject: cached.company.email_subject || `Outreach for ${normalizedCompany}`,
          body: cached.company.email_body || '',
        },
        linkedin: {
          message: cached.company.linkedin_message || '',
        },
        aiSummary: {
          headline: cached.company.ai_headline || '',
          bestAngle: cached.company.ai_best_angle || '',
          confidence: cached.company.ai_confidence || 100,
        },
        summary: cached.company.ai_headline || '',
        sources: [
          { label: 'LinkedIn', value: normalizedCompany },
          { label: 'Database', value: 'Loaded from local history cache' },
        ],
      };
    }
  } catch (err) {
    console.warn('Failed to fetch from cache, proceeding with live search:', err);
  }

  const payload = await buildCompanyPayload(normalizedCompany);

  const contacts = payload.contacts
    .map((contact) => ({
      ...contact,
      prospectScore: calculateProspectScore(contact),
      company: normalizedCompany,
      id: randomUUID(),
    }))
    .sort((left, right) => right.prospectScore - left.prospectScore);

  const outreach = await buildOutreach(
    normalizedCompany,
    payload.companyProfile.summary,
    contacts.map((contact) => `${contact.name} (${contact.designation})`),
    payload.sources,
  );

  const companyRecord: CompanyRecord = {
    id: randomUUID(),
    name: normalizedCompany,
    industry: payload.companyProfile.industry,
    website: payload.companyProfile.website,
    summary: payload.companyProfile.summary,
    created_at: new Date().toISOString(),
    ai_headline: outreach.summary,
    ai_best_angle: outreach.bestAngle,
    ai_confidence: outreach.confidence,
    email_subject: outreach.email.subject,
    email_body: outreach.email.body,
    linkedin_message: outreach.linkedin.message,
    market_status: payload.companyProfile.marketStatus,
    scale: payload.companyProfile.scale,
    annual_revenue: payload.companyProfile.annualRevenue,
    hq_region: payload.companyProfile.hqRegion,
    suggested_budget: payload.companyProfile.suggestedBudget,
    growth_trajectory: payload.companyProfile.growthTrajectory,
  };

  const news: NewsRecord[] = payload.news;

  await Promise.all([
    saveSearchHistory(normalizedCompany),
    saveCompany(companyRecord),
    saveContacts(normalizedCompany, contacts),
  ]);

  return {
    company: companyRecord,
    contacts,
    news,
    email: outreach.email,
    linkedin: outreach.linkedin,
    aiSummary: {
      headline: outreach.summary,
      bestAngle: outreach.bestAngle,
      confidence: outreach.confidence,
    },
    summary: outreach.summary,
    sources: payload.sources.length
      ? payload.sources
      : [
          { label: 'LinkedIn', value: normalizedCompany },
          { label: 'News', value: 'No live search source returned' },
          { label: 'Company', value: `${normalizedCompany} website` },
        ],
  };
}