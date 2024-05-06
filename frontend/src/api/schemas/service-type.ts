import * as z from 'zod';
import { pagination } from './pagination';
import { userShort } from './user';

export const serviceType = z.object({
  created_at: z.string().datetime(),
  description: z.string().nullable(),
  id: z.string(),
  name: z.string(),
  owner_id: z.string(),
});

export const serviceTypeUser = z.object({
  service_type: serviceType,
  user_info: userShort,
});

export const serviceTypePageList = z.object({
  data: z.array(serviceTypeUser),
  pagination_params: pagination,
});
