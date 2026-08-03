import type { SourceRecord } from '../types/search.js';

export function buildCompanyAndContactsPrompt(company: string, sources: SourceRecord[]) {
  return [
    `You are a research assistant analyzing ${company} for sales prospecting.`,
    'Analyze the company and extract key contacts from the sources provided below.',
    'Focus on identifying the most relevant decision-maker(s) for advertising, marketing partnerships, growth, or brand collaborations (e.g. CMO, Head of Marketing, Brand Manager, VP Marketing, Growth Director).',
    'IMPORTANT: Only extract individuals who are CURRENTLY working at the company. Strictly exclude former employees, ex-employees, previous founders who left, or anyone who has moved to another company.',
    'Return ONLY a valid JSON object with the following keys (no markdown, code fences, or explanations):',
    '{',
    '  "companyProfile": {',
    '    "companySummary": "a paragraph summarizing the company profile based on sources",',
    '    "industry": "industry category (e.g. Technology, Retail, Healthcare)",',
    '    "website": "official website URL (e.g. https://www.samsung.com)",',
    '    "recentLaunch": "brief mention of any recent product launches or announcements",',
    '    "marketStatus": "one-word market status, e.g. Dominant, High-Growth, Challenger, or Niche",',
    '    "scale": "employee count string, e.g. 267,000+ Employees or 5,000+ Employees",',
    '    "annualRevenue": "annual revenue string, e.g. $200B+ (2023) or $15B+ (2024)",',
    '    "hqRegion": "HQ location/region, e.g. APAC / Global, Americas / Global, Europe",',
    '    "suggestedBudget": "suggested budget string, e.g. $50M+ Allocation Signal or $5M+ Allocation Signal",',
    '    "growthTrajectory": "one-word growth trajectory: Bullish, Bearish, or Stable",',
    '    "notes": "key outreach notes or context"',
    '  },',
    '  "contacts": [',
    '    {',
    '      "name": "full name of the contact",',
    '      "designation": "job title / role",',
    '      "linkedin": "LinkedIn profile URL (or null/empty string if not found)",',
    '      "email": "email address (or null/empty string if not found)",',
    '      "confidence": 90, // a number from 0 to 100 representing extraction confidence',
    '      "verifiedProfile": true, // boolean, true if profile seems verified',
    '      "publicEmail": true, // boolean, true if email is publicly listed',
    '      "bestContact": true // boolean, true if this is a primary decision maker for advertising/marketing partnerships',
    '    }',
    '  ]',
    '}',
    '',
    'If no named people currently working there are present in the sources, return an empty array for "contacts".',
    '',
    'Sources:',
    JSON.stringify(sources, null, 2),
  ].join('\n');
}

export function buildOutreachPrompt(company: string, summary: string, contacts: string[], sources: SourceRecord[]) {
  return [
    `You are an AI sales outreach specialist drafting outreach materials for ${company}.`,
    'Generate a personalized email, LinkedIn connection message, and a quick summary hook.',
    'Return ONLY a valid JSON object with the following keys (no markdown, code fences, or explanations):',
    '{',
    '  "aiSummary": {',
    '    "headline": "a short, catchy one-line headline summarizing why they are a good fit",',
    '    "bestAngle": "the primary outreach hook/angle (e.g., AI Infrastructure, Mobile Launch)",',
    '    "confidence": 95 // number from 0 to 100 representing outreach fit confidence',
    '  },',
    '  "email": {',
    '    "subject": "professional email subject line",',
    '    "body": "personalized, concise outreach email body text addressing the recipient greeting as \'[Name]\' (e.g. \'Hi [Name],\')"',
    '  },',
    '  "linkedin": {',
    '    "message": "concise LinkedIn connection/intro message under 300 characters addressing the recipient greeting as \'[Name]\'"',
    '  }',
    '}',
    '',
    `Company Profile Summary: ${summary}`,
    `Extracted Contacts: ${contacts.join(', ') || 'None explicitly found'}`,
    'Sources:',
    JSON.stringify(sources, null, 2),
  ].join('\n');
}

export function buildSearchQueriesPrompt(company: string) {
  return [
    `You are an expert search assistant. Generate exactly 4 search queries to gather comprehensive information about the company "${company}".`,
    'We need:',
    '1. The official company website and profile.',
    '2. Recent news, marketing campaigns, and brand partnerships.',
    '3. Current Chief Marketing Officer (CMO), current Head of Marketing, Brand Director, or Advertising Lead on LinkedIn.',
    '4. Current CEO, founder, or key marketing/partnership decision-makers on LinkedIn.',
    'Important: Ensure the search queries use the word "current" or "present" (e.g. "current CMO", "current marketing director") to target active employees and avoid former employees.',
    'Important: If the company name is a common noun or abbreviation (e.g. "boat", "apple", "target", "box"), resolve/expand it to the most likely well-known business entity (e.g. "boAt Lifestyle" / "boAt audio" for "boat" unless specified otherwise, "Apple Inc." for "apple").',
    'Return ONLY a valid JSON array of 4 strings. Do not include markdown code blocks, explanation or additional text.',
    'Example output:',
    '[',
    '  "company website",',
    '  "company news",',
    '  "current CMO company leadership LinkedIn",',
    '  "current marketing head company LinkedIn"',
    ']',
  ].join('\n');
}

export function buildEmailRegenPrompt(company: string) {
  return [
    `You are an AI sales outreach specialist.`,
    `Generate a highly personalized, compelling outreach email body for a contact at "${company}".`,
    `Focus on establishing marketing/advertising partnerships and brand collaborations.`,
    `Return ONLY the email body text. Do not include subject line, greetings like 'Subject:', placeholder text, or markdown code fences.`
  ].join('\n');
}

export function buildLinkedInRegenPrompt(company: string) {
  return [
    `You are an AI sales outreach specialist.`,
    `Generate a highly personalized LinkedIn connection/introduction message for a contact at "${company}".`,
    `The message must be under 300 characters.`,
    `Focus on branding, advertising, or marketing collaborations.`,
    `Return ONLY the message text without any greetings, placeholders, or markdown code fences.`
  ].join('\n');
}

export function buildSummaryRegenPrompt(company: string) {
  return [
    `You are an AI sales research assistant.`,
    `Generate a quick 1-2 sentence hook explaining why "${company}" is a strong sales prospect for marketing collaborations.`,
    `Return ONLY the hook text.`
  ].join('\n');
}
