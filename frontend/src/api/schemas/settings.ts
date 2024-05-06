import * as z from 'zod';

export const settings = z.object({
  additionalProp1: z.string().nullable().optional(),
  additionalProp2: z.string().nullable().optional(),
  additionalProp3: z.string().nullable().optional(),
});
