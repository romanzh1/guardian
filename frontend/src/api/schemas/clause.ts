import * as z from 'zod';

export const clause = z.object({
  approved: z.boolean(),
  author_id: z.string(),
  description: z.string(),
  executor: z.string(),
  id: z.string(),
  sid: z.string(),
  status: z.string(),
  type: z.string(),
});

export const clauseList = z.array(clause);
