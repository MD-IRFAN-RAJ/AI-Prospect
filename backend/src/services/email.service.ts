import { generateEmailDraft } from './ai.service.js';

export async function regenerateEmail(company: string) {
  return generateEmailDraft(company);
}