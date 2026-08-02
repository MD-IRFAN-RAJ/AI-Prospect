import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import aiRouter from './routes/ai.routes.js';
import historyRouter from './routes/history.routes.js';
import searchRouter from './routes/search.routes.js';
import { errorHandler } from './middleware/error-handler.js';
import { notFoundHandler } from './middleware/not-found.js';

const app = express();

const corsOrigins = env.CORS_ORIGIN === '*' ? '*' : env.CORS_ORIGIN.split(',').map((o) => o.trim());

app.use(
  cors({
    origin: corsOrigins,
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