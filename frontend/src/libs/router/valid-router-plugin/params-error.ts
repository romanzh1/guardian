import * as z from 'zod';

export class ParamsError extends Error {
  detail: z.ZodError | undefined;

  constructor(message: string, detail?: z.ZodError) {
    super(message);
    this.name = 'ParamsError';
    this.detail = detail;
    if (detail) console.warn('Детали ошибки ', detail);
  }
}
