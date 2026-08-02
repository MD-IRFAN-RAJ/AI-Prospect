import type { Request, Response } from 'express';
import { z } from 'zod';
import { regenerateEmail } from '../services/email.service.js';
import { regenerateLinkedIn } from '../services/linkedin.service.js';
import { regenerateSummary } from '../services/summary.service.js';

const aiSchema = z.object({
  company: z.string().min(2),
});

export async function handleEmailRegeneration(request: Request, response: Response) {
  const body = aiSchema.parse(request.body);
  const data = await regenerateEmail(body.company);
  response.json({ success: true, data: { email: data } });
}

export async function handleLinkedInRegeneration(request: Request, response: Response) {
  const body = aiSchema.parse(request.body);
  const data = await regenerateLinkedIn(body.company);
  response.json({ success: true, data: { linkedin: data } });
}

export async function handleSummary(request: Request, response: Response) {
  const body = aiSchema.parse(request.body);
  const data = await regenerateSummary(body.company);
  response.json({ success: true, data: { summary: data } });
}