export type SearchRequestBody = {
  company: string;
};

export type CompanyRecord = {
  id?: string;
  name: string;
  industry: string;
  website: string;
  summary: string;
  created_at?: string;
};

export type ContactRecord = {
  id?: string;
  company_id?: string;
  name: string;
  designation: string;
  linkedin: string;
  email: string;
  confidence: number;
  prospectScore: number;
  verifiedProfile: boolean;
  publicEmail: boolean;
  bestContact: boolean;
};

export type NewsRecord = {
  title: string;
  age: string;
  useCase: string;
  urlLabel: string;
};

export type SourceRecord = {
  label: string;
  value: string;
};

export type SearchResponse = {
  company: CompanyRecord;
  contacts: ContactRecord[];
  news: NewsRecord[];
  email: {
    subject: string;
    body: string;
  };
  linkedin: {
    message: string;
  };
  aiSummary: {
    headline: string;
    bestAngle: string;
    confidence: number;
  };
  sources: SourceRecord[];
  summary: string;
};

export type SearchHistoryEntry = {
  id: string;
  query: string;
  created_at: string;
};