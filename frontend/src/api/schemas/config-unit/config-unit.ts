import * as z from 'zod';
import { configItemCategory } from './config-item-category';
import { pagination } from '../pagination';
import { sortParams } from '../sort-params';

export const configUnitShort = z.object({
  id: z.string(),
  cmdb_id: z.number(),
  parent_id: z.string().nullable(),
  description: z.string().nullable(),
  cmdb_fields: z.any().nullable(),
  name: z.string(),
  status: z.string(),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
});
export const provider = z.object({
  description: z.string(),
  has_children: z.boolean(),
  id: z.string(),
  name: z.string(),
});

export const quota = z.object({
  ram: z.number(),
  hdd: z.number(),
  cpu: z.number(),
});

export const utilizationInfo = z.object({
  id: z.string(),
  utilization: quota,
  quota,
});

export const configUnit = z.object({
  category: configItemCategory,
  config_unit_short: configUnitShort,
  consumers: z.array(provider).default([]),
  parent: configUnitShort.nullable(),
  provider: provider.nullable(),
  utilization_info: utilizationInfo.nullable(),
});

export const configUnitDomain = z.object({
  category: configItemCategory,
  config_unit: z.array(configUnit).default([]),
});

export const configUnitList = z.object({
  data: z.array(configUnit),
  pagination_params: pagination,
  sort_params: sortParams,
});
