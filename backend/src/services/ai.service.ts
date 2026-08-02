import { buildEmailRegenPrompt, buildLinkedInRegenPrompt, buildSummaryRegenPrompt } from '../prompts/combined.prompt.js';
import { generateText } from '../ai/gemini.js';

export async function generateCompanySummary(company: string) {
  return generateText(buildSummaryRegenPrompt(company));
}

export async function generateEmailDraft(company: string) {
  return generateText(buildEmailRegenPrompt(company));
}

export async function generateLinkedInDraft(company: string) {
  return generateText(buildLinkedInRegenPrompt(company));
}

export async function generateSummaryBlock(company: string) {
  return generateText(buildSummaryRegenPrompt(company));
}