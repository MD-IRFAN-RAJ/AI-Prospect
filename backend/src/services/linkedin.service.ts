import { generateLinkedInDraft } from './ai.service.js';

export async function regenerateLinkedIn(company: string) {
  return generateLinkedInDraft(company);
}