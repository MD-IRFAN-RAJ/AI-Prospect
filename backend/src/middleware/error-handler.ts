import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { HttpError } from '../utils/http-error.js';

export function errorHandler(error: unknown, _request: Request, response: Response, _next: NextFunction) {
  if (error instanceof ZodError) {
    response.status(400).json({ success: false, message: error.issues[0]?.message ?? 'Invalid request' });
    return;
  }

  if (error instanceof HttpError) {
    response.status(error.statusCode).json({ success: false, message: error.message });
    return;
  }

  console.error(error);
  response.status(500).json({ success: false, message: 'Internal server error' });
}