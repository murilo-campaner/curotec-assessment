import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { createError } from './errorHandler';

/**
 * Middleware factory para validação de dados usando schemas Zod
 */
export const validate = (schema: AnyZodObject, location: 'body' | 'query' | 'params' = 'body') => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const data = req[location];
      await schema.parseAsync(data);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code
        }));

        const errorMessage = `Validation failed: ${validationErrors.map(e => `${e.field}: ${e.message}`).join(', ')}`;

        return next(createError(errorMessage, 400));
      }

      next(error);
    }
  };
};

/**
 * Middleware para validação de múltiplos schemas
 */
export const validateMultiple = (schemas: {
  body?: AnyZodObject;
  query?: AnyZodObject;
  params?: AnyZodObject;
}) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validationPromises: Promise<any>[] = [];

      if (schemas.body) {
        validationPromises.push(schemas.body.parseAsync(req.body));
      }

      if (schemas.query) {
        validationPromises.push(schemas.query.parseAsync(req.query));
      }

      if (schemas.params) {
        validationPromises.push(schemas.params.parseAsync(req.params));
      }

      await Promise.all(validationPromises);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationErrors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code
        }));

        const errorMessage = `Validation failed: ${validationErrors.map(e => `${e.field}: ${e.message}`).join(', ')}`;

        return next(createError(errorMessage, 400));
      }

      next(error);
    }
  };
};

/**
 * Middleware para validação condicional
 */
export const validateConditional = (
  condition: (req: Request) => boolean,
  schema: AnyZodObject,
  location: 'body' | 'query' | 'params' = 'body'
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (condition(req)) {
      return validate(schema, location)(req, res, next);
    }
    next();
  };
};
