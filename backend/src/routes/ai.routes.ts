import { Router } from 'express';
import { asyncHandler } from '../utils/async-handler.js';
import { handleEmailRegeneration, handleLinkedInRegeneration, handleSummary } from '../controllers/ai.controller.js';

const aiRouter = Router();

aiRouter.post('/email', asyncHandler(handleEmailRegeneration));
aiRouter.post('/linkedin', asyncHandler(handleLinkedInRegeneration));
aiRouter.post('/summary', asyncHandler(handleSummary));

export default aiRouter;