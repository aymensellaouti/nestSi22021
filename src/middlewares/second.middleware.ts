import { Request, Response } from 'express';

export const secondMiddleware = function(req: Request, res: Response, next: () => void) {
  console.log('In Second Middlware');
  next();
}
