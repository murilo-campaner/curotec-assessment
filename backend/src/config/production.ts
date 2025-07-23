export const productionConfig = {
  database: {
    url: process.env['DATABASE_URL'],
  },
  server: {
    port: process.env['PORT'] || 3001,
    nodeEnv: process.env['NODE_ENV'] || 'development',
  },
  cors: {
    frontendUrl: process.env['FRONTEND_URL'] || 'https://curotec-frontend.railway.app',
    allowedOrigins: process.env['NODE_ENV'] === 'production'
      ? [process.env['FRONTEND_URL'] || 'https://curotec-frontend.railway.app']
      : ['http://localhost:5173', 'http://localhost:3000'],
  },
  railway: {
    staticUrl: process.env['RAILWAY_STATIC_URL'],
  },
};
