import * as z from 'zod';
import { pagination } from '../pagination';
import { sortParams } from '../sort-params';

export const consumer = z.object({
  consumption: z.number(),
  quota: z.number(),
  id: z.string(),
  measurement: z.string(),
  name: z.string(),
});
export const serviceResource = z.object({
  consumer: z.array(consumer).default([]),
  id: z.string(),
  resource_name: z.string(),
  measurement: z.string(),
  quota_sum: z.number(),
  total: z.number(),
});
export const consumerServiceList = z.object({
  data: z.array(serviceResource),
  pagination_params: pagination,
  sort_params: sortParams,
});
