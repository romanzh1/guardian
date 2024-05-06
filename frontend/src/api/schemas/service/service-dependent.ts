import * as z from 'zod';
import { sortParams } from '../sort-params';
import { pagination } from '../pagination';
import { short } from '../short';

export const dependent = z.object({
  description: z.string(),
  has_children: z.boolean(),
  id: z.string(),
  name: z.string(),
  owner_name: z.string(),
  service_type_name: z.string(),
  status: short,
});
export const serviceDependent = z.object({
  dependent: z.array(dependent),
  description: z.string(),
  has_children: z.boolean(),
  id: z.string(),
  name: z.string(),
  owner_name: z.string(),
  service_type_name: z.string(),
  status: short,
});

export const serviceDependentList = z.object({
  data: z.array(serviceDependent),
  pagination_params: pagination,
  sort_params: sortParams,
});
