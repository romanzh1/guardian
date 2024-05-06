import * as z from 'zod';
import { pagination } from '../pagination';
import { sortParams } from '../sort-params';
import { short } from '../short';

const category = z.object({
  consumption: z.number(),
  id: z.string(),
  name: z.string(),
  quota: z.number(),
  stat: z.number(),
});

export const consumersConfigUnits = z.object({
  created_at: z.string(),
  id: z.string(),
  name: z.string(),
  parent_id: z.string().nullable(),
  status: z.string(),
  updated_at: z.string().nullable(),
});

export const consumersCategory = z.object({
  category,
  config_units: z.array(consumersConfigUnits),
});

export const serviceConfigUnitConsumers = z.object({
  consumer: short,
  category: z.array(consumersCategory),
});
export const serviceConfigUnitConsumersList = z.object({
  data: z.array(serviceConfigUnitConsumers),
  pagination_params: pagination,
  sort_params: sortParams,
});
