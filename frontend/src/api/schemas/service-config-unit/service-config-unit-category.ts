import * as z from 'zod';
import { pagination } from '../pagination';
import { sortParams } from '../sort-params';
import { short } from '../short';
import { consumersConfigUnits } from './service-config-unit-consumers';

const category = z.object({
  amount: z.number(),
  id: z.string(),
  name: z.string(),
});

export const serviceConfigCategoryConsumers = z.object({
  consumer: short,
  usage: z.object({
    consumption: z.number(),
    quota: z.number(),
  }),
  config_units: z.array(consumersConfigUnits),
});

export const serviceConfigUnitCategory = z.object({
  category,
  consumers: z.array(serviceConfigCategoryConsumers),
});
export const serviceConfigUnitCategoryList = z.object({
  data: z.array(serviceConfigUnitCategory),
  pagination_params: pagination,
  sort_params: sortParams,
});
