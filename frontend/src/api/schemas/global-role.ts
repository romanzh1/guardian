import * as z from 'zod';

export const globalRole = z
  .object({
    description: z.string(),
    id: z.string(),
    name: z.string(),
  })
  .strict();
