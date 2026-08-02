import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import aiRouter from './routes/ai.routes.js';
import historyRouter from './routes/history.routes.js';
import searchRouter from './routes/search.routes.js';
import { errorHandler } from './middleware/error-handler.js';
import { notFoundHandler } from './middleware/not-found.js';

const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN,
  }),
);
app.use(express.json());

app.get('/health', (_request, response) => {
  response.json({ success: true, data: { status: 'ok' } });
});

app.use('/api/search', searchRouter);
app.use('/api/history', historyRouter);
app.use('/api', aiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;