import * as z from 'zod';

export const group = z.object({
  description: z.string(),
  id: z.string(),
  name: z.string(),
  created_at: z.string().datetime(),
});

export const groupList = z.array(group);
