import * as z from 'zod';

export const direction = z.object({
  description: z.string(),
  id: z.string(),
  name: z.string(),
  created_at: z.string().datetime(),
});

export const directionList = z.array(direction);
