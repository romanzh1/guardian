import * as z from 'zod';
import {
  MAX_GROUP_KE_NAME,
  MAX_SIZE_DESCRIPTION_REFERENCE,
  MAX_SIZE_NAME,
  MAX_SIZE_TAG_NAME,
  MIN_SIZE,
  REQUIRED_FIELD,
} from 'src/constants';
import { maxSize, minSize } from 'src/shared/utils';

export const folderValidation = z
  .object({
    description: z
      .string()
      .nonempty(REQUIRED_FIELD)
      .min(MIN_SIZE, minSize(MIN_SIZE))
      .max(MAX_SIZE_DESCRIPTION_REFERENCE, maxSize(MAX_SIZE_DESCRIPTION_REFERENCE)),
    name: z
      .string()
      .nonempty(REQUIRED_FIELD)
      .min(MIN_SIZE, minSize(MIN_SIZE))
      .max(MAX_SIZE_NAME, maxSize(MAX_SIZE_NAME)),
    createBy: z.string().optional(),
  })
  .strict();

export const tagValidation = z
  .object({
    description: z
      .string()
      .nonempty(REQUIRED_FIELD)
      .min(MIN_SIZE, minSize(MIN_SIZE))
      .max(MAX_SIZE_DESCRIPTION_REFERENCE, maxSize(MAX_SIZE_DESCRIPTION_REFERENCE)),
    name: z
      .string()
      .nonempty(REQUIRED_FIELD)
      .min(MIN_SIZE, minSize(MIN_SIZE))
      .max(MAX_SIZE_TAG_NAME, maxSize(MAX_SIZE_TAG_NAME)),
    color: z.string().optional(),
  })
  .strict();

export const resourceTypeValidation = z
  .object({
    description: z
      .string()
      .nonempty(REQUIRED_FIELD)
      .min(MIN_SIZE, minSize(MIN_SIZE))
      .max(MAX_SIZE_DESCRIPTION_REFERENCE, maxSize(MAX_SIZE_DESCRIPTION_REFERENCE)),
    name: z
      .string()
      .nonempty(REQUIRED_FIELD)
      .min(MIN_SIZE, minSize(MIN_SIZE))
      .max(MAX_SIZE_NAME, maxSize(MAX_SIZE_NAME)),
    isCountable: z.boolean(),
  })
  .strict();

export const categoryKeValidation = z.object({
  description: z
    .string()
    .nonempty(REQUIRED_FIELD)
    .min(MIN_SIZE, minSize(MIN_SIZE))
    .max(MAX_SIZE_DESCRIPTION_REFERENCE, maxSize(MAX_SIZE_DESCRIPTION_REFERENCE)),
  name: z
    .string()
    .nonempty(REQUIRED_FIELD)
    .min(MIN_SIZE, minSize(MIN_SIZE))
    .max(MAX_GROUP_KE_NAME, maxSize(MAX_GROUP_KE_NAME)),
  categoryId: z.array(z.object({ id: z.string(), name: z.string() })).optional(),
});
