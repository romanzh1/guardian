import * as z from 'zod';

export const response = z.object({
  id: z.string(),
  error: z.string().optional(),
});
