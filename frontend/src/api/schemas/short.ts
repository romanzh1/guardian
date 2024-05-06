import * as z from 'zod';

export const short = z.object({
  id: z.string(),
  name: z.string(),
});

export const shortList = z.array(short);
