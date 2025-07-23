import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';

// Carregar variáveis de ambiente
dotenv.config();

// Importar middlewares e rotas
import { errorHandler } from './middlewares/errorHandler';
import { healthRoutes } from './routes/health';
import { postRoutes } from './routes/posts';
import { specs } from './swagger';

// Criar aplicação Express
const app = express();
const PORT = process.env['PORT'] || 3001;

// Middlewares básicos
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/health', healthRoutes);
app.use('/api/posts', postRoutes);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Curotec Posts API Documentation',
}));

// Rota raiz
app.get('/', (_req, res) => {
  res.json({
    message: 'Curotec API - Backend Assessment',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      posts: '/api/posts',
      search: '/api/posts/search',
      stats: '/api/posts/stats'
    }
  });
});

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📝 Posts API: http://localhost:${PORT}/api/posts`);
  console.log(`🔍 Search API: http://localhost:${PORT}/api/posts/search`);
  console.log(`📈 Stats API: http://localhost:${PORT}/api/posts/stats`);
  console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
  console.log(`⏰ Started at: ${new Date().toISOString()}`);
});

// Tratamento de erros não capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

export default app;
