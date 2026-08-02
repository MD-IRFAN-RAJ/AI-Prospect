import { Router } from 'express';
import { asyncHandler } from '../utils/async-handler.js';
import { handleSearch } from '../controllers/search.controller.js';

const searchRouter = Router();

searchRouter.post('/', asyncHandler(handleSearch));

export default searchRouter;