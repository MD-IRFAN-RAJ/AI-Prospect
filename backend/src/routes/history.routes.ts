import { Router } from 'express';
import { asyncHandler } from '../utils/async-handler.js';
import { createSearchHistory, getSearchHistory } from '../controllers/history.controller.js';

const historyRouter = Router();

historyRouter.get('/', asyncHandler(getSearchHistory));
historyRouter.post('/', asyncHandler(createSearchHistory));

export default historyRouter;