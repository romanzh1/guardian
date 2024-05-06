import * as z from 'zod';
import { pagination } from '../pagination';
import { sortParams } from '../sort-params';

export const configItemCategory = z.object({
  description: z.string().nullable(),
  id: z.string(),
  name: z.string(),
  cmdb_id: z.number(),
  updated_at: z.string().nullable(),
});

export const configItemCategoryList = z.object({
  data: z.array(configItemCategory),
  pagination_params: pagination,
  sort_params: sortParams,
});
