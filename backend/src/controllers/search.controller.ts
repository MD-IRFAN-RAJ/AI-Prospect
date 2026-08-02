import { z } from 'zod';
import type { Request, Response } from 'express';
import type { SearchRequestBody } from '../types/search.js';
import { searchCompany } from '../services/search.service.js';

const searchSchema = z.object({
  company: z.string().min(2),
});

export async function handleSearch(request: Request, response: Response) {
  const body = searchSchema.parse(request.body) as SearchRequestBody;
  const data = await searchCompany(body.company);
  response.json({ success: true, data });
}