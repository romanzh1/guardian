import * as z from 'zod';
import { pagination } from '../pagination';
import { sortParams } from '../sort-params';

const short = z.object({
  id: z.string(),
  name: z.string(),
});

export const serviceConfigUnit = z.object({
  category: short,
  provider: short.nullable(),
  config_unit: z.object({
    id: z.string(),
    name: z.string(),
    parent_id: z.string().nullable(),
    created_at: z.string(),
    updated_at: z.string().nullable(),
    status: z.string(),
  }),
});
export const serviceConfigUnitList = z.object({
  data: z.array(serviceConfigUnit),
  pagination_params: pagination,
  sort_params: sortParams,
});
