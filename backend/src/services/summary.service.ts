import { generateSummaryBlock } from './ai.service.js';

export async function regenerateSummary(company: string) {
  return generateSummaryBlock(company);
}