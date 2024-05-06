import * as z from 'zod';
import {
  MAX_DIRECTION_NAME,
  MAX_GROUP_NAME,
  MAX_ROLE_NAME,
  MAX_SIZE_DESCRIPTION_REFERENCE,
  MIN_SIZE,
  REQUIRED_FIELD,
} from 'src/constants';
import { maxSize, minSize } from 'src/shared/utils';

export const roleValidation = z.object({
  name: z.string().nonempty(REQUIRED_FIELD).min(MIN_SIZE, minSize(MIN_SIZE)).max(MAX_ROLE_NAME, maxSize(MAX_ROLE_NAME)),
  base: z.string().optional(),
  description: z
    .string()
    .nonempty(REQUIRED_FIELD)
    .min(MIN_SIZE, minSize(MIN_SIZE))
    .max(MAX_SIZE_DESCRIPTION_REFERENCE, maxSize(MAX_SIZE_DESCRIPTION_REFERENCE)),
});
export const groupValidation = z.object({
  name: z
    .string()
    .nonempty(REQUIRED_FIELD)
    .min(MIN_SIZE, minSize(MIN_SIZE))
    .max(MAX_GROUP_NAME, maxSize(MAX_GROUP_NAME)),
  description: z
    .string()
    .nonempty(REQUIRED_FIELD)
    .min(MIN_SIZE, minSize(MIN_SIZE))
    .max(MAX_SIZE_DESCRIPTION_REFERENCE, maxSize(MAX_SIZE_DESCRIPTION_REFERENCE)),
});
export const directionValidation = z.object({
  name: z
    .string()
    .nonempty(REQUIRED_FIELD)
    .min(MIN_SIZE, minSize(MIN_SIZE))
    .max(MAX_DIRECTION_NAME, maxSize(MAX_DIRECTION_NAME)),
  description: z
    .string()
    .nonempty(REQUIRED_FIELD)
    .min(MIN_SIZE, minSize(MIN_SIZE))
    .max(MAX_SIZE_DESCRIPTION_REFERENCE, maxSize(MAX_SIZE_DESCRIPTION_REFERENCE)),
});
