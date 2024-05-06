import * as z from 'zod';
import { pagination } from './pagination';
import { sortParams } from './sort-params';

export const quotaNumbers = z.object({
  cpu: z.number(),
  hdd: z.number(),
  ram: z.number(),
});

export const categoryUtilization = z.object({
  category_name: z.string(),
  id: z.string(),
  quota: quotaNumbers,
  stats: quotaNumbers,
  utilization: quotaNumbers,
});

export const categoryUtilizationList = z.object({
  data: z.array(categoryUtilization),
  pagination_params: pagination,
  sort_params: sortParams,
});

export const utilization = z.object({
  config_unit_name: z.string(),
  id: z.string(),
  quota: quotaNumbers,
  stats: quotaNumbers,
  utilization: quotaNumbers,
});

export const utilizationList = z.object({
  data: z.array(utilization),
  pagination_params: pagination,
  sort_params: sortParams,
});
