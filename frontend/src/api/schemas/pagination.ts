import * as z from 'zod';

export const pagination = z.object({
  page: z.number(),
  total: z.number(),
  limit: z.number(),
});
