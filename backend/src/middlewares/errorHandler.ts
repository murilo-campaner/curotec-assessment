import { Request, Response, NextFunction } from 'express';

// Interface para erros customizados
export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

// Classe para erros da aplicação
export class CustomError extends Error implements AppError {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Middleware de tratamento de erros
export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let { statusCode = 500, message } = error;

  // Log do erro para debugging
  console.error('Error:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Se for erro de validação do Zod
  if (error.name === 'ZodError') {
    statusCode = 400;
    message = 'Dados inválidos fornecidos';
  }

  // Se for erro de conexão com banco
  if (error.name === 'PrismaClientKnownRequestError') {
    statusCode = 400;
    message = 'Erro na operação com banco de dados';
  }

  // Se for erro de conexão com banco
  if (error.name === 'PrismaClientUnknownRequestError') {
    statusCode = 500;
    message = 'Erro interno do banco de dados';
  }

  // Se for erro de conexão
  if (error.name === 'PrismaClientInitializationError') {
    statusCode = 503;
    message = 'Serviço temporariamente indisponível';
  }

  // Resposta padronizada de erro
  res.status(statusCode).json({
    success: false,
    error: {
      message: message || 'Erro interno do servidor',
      statusCode,
      timestamp: new Date().toISOString(),
      path: req.url
    }
  });
};

// Função helper para criar erros customizados
export const createError = (message: string, statusCode: number = 500): CustomError => {
  return new CustomError(message, statusCode);
};

// Middleware para capturar erros assíncronos
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
