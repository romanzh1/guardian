import * as z from 'zod';

export const serviceParent = z.object({
  id: z.string(),
  name: z.string(),
});

export const serviceParents = z.array(serviceParent);
