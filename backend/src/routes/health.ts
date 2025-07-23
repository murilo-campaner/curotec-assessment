import { Router, Request, Response } from 'express';

const router = Router();

// Health check básico
router.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    status: 'ok',
    message: 'API está funcionando corretamente',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env['NODE_ENV'] || 'development'
  });
});

// Health check detalhado
router.get('/detailed', (_req: Request, res: Response) => {
  const healthData = {
    success: true,
    status: 'ok',
    message: 'API está funcionando corretamente',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env['NODE_ENV'] || 'development',
    version: '1.0.0',
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      external: Math.round(process.memoryUsage().external / 1024 / 1024)
    },
    process: {
      pid: process.pid,
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch
    }
  };

  res.json(healthData);
});

// Health check do banco de dados (será implementado depois)
router.get('/database', async (_req: Request, res: Response) => {
  try {
    // TODO: Implementar verificação de conexão com banco
    res.json({
      success: true,
      status: 'ok',
      message: 'Conexão com banco de dados está funcionando',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      status: 'error',
      message: 'Erro na conexão com banco de dados',
      timestamp: new Date().toISOString()
    });
  }
});

export const healthRoutes = router;
