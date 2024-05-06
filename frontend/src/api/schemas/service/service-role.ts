import * as z from 'zod';

export const serviceRole = z.object({
  description: z.string(),
  id: z.string(),
  name: z.string(),
  created_at: z.string().datetime(),
  base: z.string(),
});

export const serviceRoleList = z.array(serviceRole);
