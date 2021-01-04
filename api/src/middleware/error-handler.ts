import { Handler, Request, Response } from 'express';

// Default error handler for all uncaught exceptions.
export function errorHandler(err: Error, _req: Request, res: Response, _next: Handler) {
  console.error(err.stack);
  res.status(400).send('Bad reqest.');
}
