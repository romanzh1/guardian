import * as z from 'zod';
import { pagination } from '../pagination';
import { sortParams } from '../sort-params';

const group = z.object({
  id: z.string(),
  name: z.string(),
});

const configurationUnit = z.object({
  id: z.string(),
  name: z.string(),
  parent_id: z.string().nullable(),
  status: z.string(),
  created_at: z.string(),
  updated_at: z.string().nullable(),
});

export const resourceConfigUnits = z.object({
  configuration_unit: configurationUnit,
  provider: group.nullable(),
});

export const serviceResourceCategories = z.object({
  category: group,
  category_usage: z.object({ quota: z.number(), consumption: z.number() }).nullable(),
  config_units: z.array(resourceConfigUnits),
});

export const serviceConfigUnitConsumption = z.object({
  group,
  categories: z.array(serviceResourceCategories),
});

export const serviceConfigUnitConsumptionList = z.object({
  data: z.array(serviceConfigUnitConsumption),
  pagination_params: pagination,
  sort_params: sortParams,
});
