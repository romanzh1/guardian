import * as z from 'zod';
import { pagination } from './pagination';

export const tag = z.object({
  color: z.string(),
  created_at: z.string().datetime(),
  description: z.string().nullable(),
  id: z.string(),
  name: z.string(),
});

export const tagList = z.array(tag);

export const tagPageList = z.object({
  data: tagList,
  pagination_params: pagination,
});

export const tagShort = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
});

export const tagShortList = z.array(tagShort);
