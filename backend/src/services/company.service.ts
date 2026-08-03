import axios from 'axios';
import { env } from '../config/env.js';
import { generateJSON } from '../ai/gemini.js';
import type { ContactRecord, NewsRecord, SourceRecord } from '../types/search.js';

type TavilyResult = {
  title?: string;
  url?: string;
  content?: string;
};

type CompanyAnalysis = {
  companySummary?: string;
  industry?: string;
  website?: string;
  recentLaunch?: string;
  notes?: string;
};

type ContactExtraction = {
  contacts?: Array<{
    name?: string;
    designation?: string;
    linkedin?: string;
    email?: string;
    confidence?: number;
    verifiedProfile?: boolean;
    publicEmail?: boolean;
    bestContact?: boolean;
  }>;
};

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'brand';
}

function titleCase(value: string) {
  return value
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

import { buildCompanyAndContactsPrompt, buildSearchQueriesPrompt } from '../prompts/combined.prompt.js';

async function searchSources(company: string): Promise<SourceRecord[]> {
  if (!env.TAVILY_API_KEY) {
    return [];
  }

  let queries = [
    `${company} official website`,
    `${company} news recent updates`,
    `site:linkedin.com/in/ "${company}" current (CMO OR "Marketing Director" OR "VP Marketing" OR "Head of Marketing")`,
    `site:linkedin.com/in/ "${company}" current (CEO OR Founder OR President)`,
  ];

  try {
    const queryPrompt = buildSearchQueriesPrompt(company);
    const generatedQueries = await generateJSON<string[]>(queryPrompt);
    if (Array.isArray(generatedQueries) && generatedQueries.length > 0) {
      queries = generatedQueries.slice(0, 4).map((q, idx) => {
        if (idx >= 2 || /linkedin|cmo|ceo|marketing|contact|director|founder|president|head/i.test(q)) {
          if (!q.includes('site:')) {
            const cleaned = q.replace(/linkedin|on linkedin/gi, '').trim();
            return `site:linkedin.com/in/ "${company}" current ${cleaned}`;
          }
        }
        return q;
      });
      console.log('Using generated search queries targeting LinkedIn:', queries);
    }
  } catch (err) {
    console.warn('Failed to generate search queries, using fallback:', err);
  }

  const results = await Promise.all(
    queries.map(async (query) => {
      try {
        const response = await axios.post(
          'https://api.tavily.com/search',
          {
            api_key: env.TAVILY_API_KEY,
            query,
            search_depth: 'basic',
            max_results: 3,
            include_answer: false,
            include_raw_content: false,
          },
          { headers: { 'Content-Type': 'application/json' } },
        );

        return (response.data?.results as TavilyResult[] | undefined) ?? [];
      } catch {
        return [] as TavilyResult[];
      }
    }),
  );

  return results.flat().slice(0, 8).map((item, index) => ({
    label: item.title || `Source ${index + 1}`,
    value: `URL: ${item.url || 'N/A'}\nContent: ${item.content || ''}`,
  }));
}

type CompanyAndContactsPayload = {
  companyProfile?: {
    companySummary?: string;
    industry?: string;
    website?: string;
    recentLaunch?: string;
    marketStatus?: string;
    scale?: string;
    annualRevenue?: string;
    hqRegion?: string;
    suggestedBudget?: string;
    growthTrajectory?: string;
    notes?: string;
  };
  contacts?: Array<{
    name?: string;
    designation?: string;
    linkedin?: string;
    email?: string;
    confidence?: any;
    verifiedProfile?: boolean;
    publicEmail?: boolean;
    bestContact?: boolean;
  }>;
};

function parseConfidence(val: any): number {
  if (typeof val === 'number') return val;
  if (typeof val === 'string') {
    const num = parseInt(val, 10);
    if (!isNaN(num)) return num;
    const lower = val.toLowerCase();
    if (lower === 'high') return 90;
    if (lower === 'medium') return 60;
    if (lower === 'low') return 30;
  }
  return 50;
}

async function analyzeCompanyAndExtractContacts(company: string, sources: SourceRecord[]) {
  const result = await generateJSON<CompanyAndContactsPayload>(buildCompanyAndContactsPrompt(company, sources));
  
  const companyProfile = {
    summary: result.companyProfile?.companySummary?.trim() || `${company} appears active and relevant for outreach.`,
    industry: result.companyProfile?.industry?.trim() || 'Unknown',
    website: result.companyProfile?.website?.trim() || `https://www.${slugify(company)}.com`,
    recentLaunch: result.companyProfile?.recentLaunch?.trim() || '',
    marketStatus: result.companyProfile?.marketStatus?.trim() || 'High-Growth',
    scale: result.companyProfile?.scale?.trim() || '10,000+ Employees',
    annualRevenue: result.companyProfile?.annualRevenue?.trim() || '$10B+',
    hqRegion: result.companyProfile?.hqRegion?.trim() || 'Global',
    suggestedBudget: result.companyProfile?.suggestedBudget?.trim() || '$10M+ Allocation Signal',
    growthTrajectory: result.companyProfile?.growthTrajectory?.trim() || 'Bullish',
    notes: result.companyProfile?.notes?.trim() || '',
  };

  const contacts = (result.contacts || [])
    .filter((contact) => contact.name && contact.designation)
    .map<ContactRecord>((contact) => {
      let linkedinUrl = contact.linkedin || '';
      if (!linkedinUrl && contact.name) {
        linkedinUrl = `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(`${contact.name} ${company}`)}`;
      }
      return {
        id: undefined,
        company_id: undefined,
        company,
        name: contact.name || '',
        designation: contact.designation || '',
        linkedin: linkedinUrl,
        email: contact.email || '',
        confidence: parseConfidence(contact.confidence),
        prospectScore: parseConfidence(contact.confidence),
        verifiedProfile: Boolean(contact.verifiedProfile),
        publicEmail: Boolean(contact.publicEmail),
        bestContact: Boolean(contact.bestContact),
      };
    });

  return { companyProfile, contacts };
}

function buildNews(company: string, sources: SourceRecord[]): NewsRecord[] {
  const newsSources = sources.filter((source) => /news|launch|press|update/i.test(source.label + ' ' + source.value));
  return newsSources.slice(0, 3).map((source, index) => ({
    title: source.label || `${company} update ${index + 1}`,
    age: index === 0 ? 'Recent' : `${index + 1} days ago`,
    useCase: 'Use this in outreach',
    urlLabel: 'Read',
  }));
}

export async function buildCompanyPayload(company: string) {
  const normalizedCompany = titleCase(company);
  const sources = await searchSources(normalizedCompany);
  const { companyProfile, contacts } = await analyzeCompanyAndExtractContacts(normalizedCompany, sources);

  return {
    normalizedCompany,
    companyProfile,
    contacts,
    news: buildNews(normalizedCompany, sources),
    sources,
  };
}
