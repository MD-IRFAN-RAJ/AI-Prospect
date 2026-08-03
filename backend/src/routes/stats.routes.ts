import { Router } from 'express';
import { asyncHandler } from '../utils/async-handler.js';
import { handleGetStats } from '../controllers/stats.controller.js';

const statsRouter = Router();

statsRouter.get('/', asyncHandler(handleGetStats));

export default statsRouter;
