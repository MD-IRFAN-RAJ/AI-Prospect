import type { ContactRecord } from '../types/search.js';

const seniorityWeights: Array<[RegExp, number]> = [
  [/director/i, 28],
  [/head/i, 26],
  [/vp|vice president/i, 32],
  [/manager/i, 18],
  [/lead/i, 22],
];

export function calculateProspectScore(contact: Pick<ContactRecord, 'designation' | 'confidence' | 'verifiedProfile' | 'publicEmail'>): number {
  const seniority = seniorityWeights.find(([pattern]) => pattern.test(contact.designation))?.[1] ?? 14;
  const profileBonus = contact.verifiedProfile ? 18 : 4;
  const emailBonus = contact.publicEmail ? 16 : 0;
  const confidence = Math.round(contact.confidence * 0.4);

  return Math.min(100, seniority + profileBonus + emailBonus + confidence + 20);
}