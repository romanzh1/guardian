import * as z from 'zod';
import { user } from '../user';
import { tag } from '../tag';
import { serviceType } from '../service-type';
import { serviceDomain } from './service-domain';
import { pagination } from '../pagination';
import { sortParams } from '../sort-params';
import { short } from '../short';

export const service = z.object({
  is_archived: z.boolean(),
  owner: user,
  service: serviceDomain,
  tags: z.array(tag).default([]),
  type: serviceType,
  status: short,
});

export const services = z.object({
  id: z.string(),
  has_children: z.boolean(),
  name: z.string(),
  owner_name: z.string(),
  service_type_name: z.string(),
  status: short,
  description: z.string(),
});

export const serviceList = z.object({
  data: z.array(services),
  pagination_params: pagination,
  sort_params: sortParams,
});

export const serviceShort = z.object({
  id: z.string(),
  has_children: z.boolean(),
  name: z.string(),
  description: z.string(),
});

export const serviceShortList = z.array(serviceShort);

export const archiveService = z.object({
  id: z.string(),
  name: z.string(),
  parent_id: z.string().nullable(),
  parent_name: z.string().nullable(),
  service_type_name: z.string(),
  updated_at: z.string().datetime(),
});
export const archiveServiceList = z.array(archiveService);
