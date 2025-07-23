import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';

// Tipos para middleware de validação
export interface ValidationMiddleware {
  (schema: ZodSchema): (req: Request, res: Response, next: NextFunction) => void;
}

// Tipos para middleware de erro
export interface ErrorHandlerMiddleware {
  (error: Error, req: Request, res: Response, next: NextFunction): void;
}

// Tipos para middleware de autenticação
export interface AuthMiddleware {
  (req: Request, res: Response, next: NextFunction): void;
}

// Tipos para middleware de logging
export interface LoggingMiddleware {
  (req: Request, res: Response, next: NextFunction): void;
}

// Tipos para middleware de rate limiting
export interface RateLimitOptions {
  windowMs: number;
  max: number;
  message?: string;
  statusCode?: number;
}

export interface RateLimitMiddleware {
  (options: RateLimitOptions): (req: Request, res: Response, next: NextFunction) => void;
}

// Tipos para middleware de CORS
export interface CorsOptions {
  origin?: string | string[] | boolean | RegExp | ((origin: string, callback: (err: Error | null, allow?: boolean) => void) => void);
  methods?: string | string[];
  allowedHeaders?: string | string[];
  exposedHeaders?: string | string[];
  credentials?: boolean;
  maxAge?: number;
  preflightContinue?: boolean;
  optionsSuccessStatus?: number;
}

export interface CorsMiddleware {
  (options?: CorsOptions): (req: Request, res: Response, next: NextFunction) => void;
}

// Tipos para middleware de compressão
export interface CompressionOptions {
  filter?: (req: Request, res: Response) => boolean;
  level?: number;
  threshold?: number;
  windowBits?: number;
  memLevel?: number;
  strategy?: number;
  chunkSize?: number;
  dictionary?: Buffer | string;
}

export interface CompressionMiddleware {
  (options?: CompressionOptions): (req: Request, res: Response, next: NextFunction) => void;
}

// Tipos para middleware de helmet
export interface HelmetOptions {
  contentSecurityPolicy?: boolean | object;
  crossOriginEmbedderPolicy?: boolean | object;
  crossOriginOpenerPolicy?: boolean | object;
  crossOriginResourcePolicy?: boolean | object;
  dnsPrefetchControl?: boolean | object;
  frameguard?: boolean | object;
  hidePoweredBy?: boolean | object;
  hsts?: boolean | object;
  ieNoOpen?: boolean | object;
  noSniff?: boolean | object;
  permittedCrossDomainPolicies?: boolean | object;
  referrerPolicy?: boolean | object;
  xssFilter?: boolean | object;
}

export interface HelmetMiddleware {
  (options?: HelmetOptions): (req: Request, res: Response, next: NextFunction) => void;
}

// Tipos para middleware customizado
export interface CustomMiddleware {
  (req: Request, res: Response, next: NextFunction): void | Promise<void>;
}

// Tipos para middleware de validação de entrada
export interface InputValidationOptions {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
  headers?: ZodSchema;
}

export interface InputValidationMiddleware {
  (options: InputValidationOptions): (req: Request, res: Response, next: NextFunction) => void;
}

// Tipos para middleware de sanitização
export interface SanitizationOptions {
  body?: boolean;
  query?: boolean;
  params?: boolean;
  headers?: boolean;
}

export interface SanitizationMiddleware {
  (options: SanitizationOptions): (req: Request, res: Response, next: NextFunction) => void;
}

// Tipos para middleware de cache
export interface CacheOptions {
  duration: number;
  key?: (req: Request) => string;
  condition?: (req: Request, res: Response) => boolean;
}

export interface CacheMiddleware {
  (options: CacheOptions): (req: Request, res: Response, next: NextFunction) => void;
}

// Tipos para middleware de monitoramento
export interface MonitoringOptions {
  enabled: boolean;
  metrics?: {
    responseTime?: boolean;
    requestCount?: boolean;
    errorRate?: boolean;
  };
}

export interface MonitoringMiddleware {
  (options: MonitoringOptions): (req: Request, res: Response, next: NextFunction) => void;
}
