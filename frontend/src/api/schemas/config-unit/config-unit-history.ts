import * as z from 'zod';
import { userShort } from '../user';

export const configUnitHistory = z.object({
  author: userShort,
  history: z.object({
    author_id: z.string(),
    id: z.string(),
    record: z.string(),
    type: z.string(),
    updated_at: z.string(),
  }),
});

export const configUnitHistoryList = z.array(configUnitHistory);
