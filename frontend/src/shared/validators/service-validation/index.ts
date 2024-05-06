import * as z from 'zod';
import { maxSize, minSize } from 'src/shared/utils';
import {
  MAX_SIZE_DESCRIPTION,
  MAX_SIZE_LINKS,
  MAX_SIZE_NAME,
  MIN_SIZE,
  REQUIRED_FIELD,
  SHORT_NAME_MAX,
} from 'src/constants';

const tags = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
});

export const serviceValidation = z.object({
  name: z.string().nonempty(REQUIRED_FIELD).min(MIN_SIZE, minSize(MIN_SIZE)).max(MAX_SIZE_NAME, maxSize(MAX_SIZE_NAME)),
  typeId: z.string().nonempty(REQUIRED_FIELD),
  category: z.string().nonempty(REQUIRED_FIELD),
  description: z
    .string()
    .nonempty(REQUIRED_FIELD)
    .min(MIN_SIZE, minSize(MIN_SIZE))
    .max(MAX_SIZE_DESCRIPTION, maxSize(MAX_SIZE_DESCRIPTION)),
  sla: z.string().max(MAX_SIZE_DESCRIPTION, maxSize(MAX_SIZE_DESCRIPTION)),
  status: z.string().nonempty(REQUIRED_FIELD),
  git: z.string().max(MAX_SIZE_LINKS, maxSize(MAX_SIZE_LINKS)),
  wiki: z.string().max(MAX_SIZE_LINKS, maxSize(MAX_SIZE_LINKS)),
  id: z.string().optional(),
  parentId: z.string().optional(),
  sd_form_id: z.string().optional(),
  tags: z.array(tags).optional(),
  shortName: z
    .string()
    .nonempty(REQUIRED_FIELD)
    .min(MIN_SIZE, minSize(MIN_SIZE))
    .max(SHORT_NAME_MAX, maxSize(SHORT_NAME_MAX)),
  criticality: z.string().nonempty(REQUIRED_FIELD),
});
