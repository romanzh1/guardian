import * as z from 'zod';

export const sortParams = z.object({
  sort_by: z.string(),
  sort_dir: z.string(),
});
