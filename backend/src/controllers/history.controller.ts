import type { Request, Response } from 'express';
import { z } from 'zod';
import { addHistoryEntry, getHistory } from '../services/history.service.js';

const historySchema = z.object({
  query: z.string().min(1),
});

export async function getSearchHistory(_request: Request, response: Response) {
  const data = await getHistory();
  response.json({ success: true, data });
}

export async function createSearchHistory(request: Request, response: Response) {
  const body = historySchema.parse(request.body);
  const data = await addHistoryEntry(body.query);
  response.status(201).json({ success: true, data });
}