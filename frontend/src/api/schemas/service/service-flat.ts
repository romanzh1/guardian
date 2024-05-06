import * as z from 'zod';
import { short } from '../short';
import { pagination } from '../pagination';
import { sortParams } from '../sort-params';
import { ownerUser } from '../user';

const service = z.object({
  description: z.string(),
  id: z.string(),
  name: z.string(),
  status: z.string(),
});

export const serviceFlat = z.object({
  service,
  service_type: short,
});

export const serviceFlatNewVersion = z.object({
  service,
  owner: ownerUser,
  service_type: short,
  status: short,
});

export const serviceFlatList = z.object({
  data: z.array(serviceFlatNewVersion),
  pagination_params: pagination,
  sort_params: sortParams,
});
