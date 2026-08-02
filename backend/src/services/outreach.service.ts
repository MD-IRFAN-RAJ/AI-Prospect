import { generateJSON } from '../ai/gemini.js';
import type { SourceRecord } from '../types/search.js';
import { buildOutreachPrompt } from '../prompts/combined.prompt.js';

type CombinedOutreachPayload = {
  aiSummary?: {
    headline?: string;
    bestAngle?: string;
    confidence?: number;
  };
  email?: {
    subject?: string;
    body?: string;
  };
  linkedin?: {
    message?: string;
  };
};

export async function buildOutreach(company: string, summary: string, contacts: string[], sources: SourceRecord[]) {
  const result = await generateJSON<CombinedOutreachPayload>(buildOutreachPrompt(company, summary, contacts, sources));

  return {
    summary: result.aiSummary?.headline || summary,
    bestAngle: result.aiSummary?.bestAngle || 'Prospecting Hook',
    confidence: result.aiSummary?.confidence ?? 85,
    email: {
      subject: result.email?.subject || `Outreach for ${company}`,
      body: result.email?.body || '',
    },
    linkedin: {
      message: result.linkedin?.message || '',
    },
  };
}
