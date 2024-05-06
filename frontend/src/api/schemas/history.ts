import * as z from 'zod';
import { userShort } from './user';

const historyDomain = z.object({
  id: z.string(),
  author_id: z.string(),
  record: z.string(),
  type: z.string(),
  updated_at: z.string().datetime(),
});

export const history = z.object({
  author: userShort,
  history: historyDomain,
});

export const historyList = z.array(history);
