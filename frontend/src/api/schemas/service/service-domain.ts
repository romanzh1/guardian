import * as z from 'zod';
import { settings } from '../settings';

export const serviceDomain = z.object({
  created_at: z.string().datetime(),
  description: z.string().nullable(),
  git: z.string().nullable(),
  id: z.string(),
  criticality: z.string(),
  short_name: z.string(),
  category: z.string(),
  name: z.string(),
  parent_id: z.string().nullable(),
  settings: settings.nullable(),
  sla: z.string().nullable(),
  status_id: z.string(),
  type_id: z.string(),
  updated_at: z.string().datetime().nullable(),
  wiki: z.string().nullable(),
});
