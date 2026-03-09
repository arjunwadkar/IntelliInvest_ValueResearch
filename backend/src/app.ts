import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import sectorRoutes from './routes/sector.routes';
import companyRoutes from './routes/company.routes';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    mode: process.env.USE_STUBS === 'true' ? 'stub' : 'real'
  });
});

// API Routes
app.use('/api/sectors', sectorRoutes);
app.use('/api/companies', companyRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error('Error:', err);
  res.status(500).json({ error: err.message });
});

export default app;
