import { randomUUID } from 'node:crypto';
import { calculateProspectScore } from '../utils/score.js';
import type { CompanyRecord, NewsRecord, SearchResponse } from '../types/search.js';
import { buildCompanyPayload } from './company.service.js';
import { buildOutreach } from './outreach.service.js';
import { saveCompany, saveContacts, saveSearchHistory } from '../supabase/repository.js';

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