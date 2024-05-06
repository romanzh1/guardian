import * as z from 'zod';
import { maxSize, minSize } from 'src//shared/utils';
import {
  MAX_SIZE_COMMENT,
  MAX_SIZE_CONSUMPTION,
  MAX_SIZE_DESCRIPTION,
  MAX_SIZE_NAME,
  MAX_SIZE_QUOTA,
  MIN_SIZE,
  MIN_SIZE_QUOTA,
  REQUIRED_FIELD,
} from 'src/constants';

export const resourceCreateValidation = z.object({
  name: z.string().nonempty(REQUIRED_FIELD).min(MIN_SIZE, minSize(MIN_SIZE)).max(MAX_SIZE_NAME, maxSize(MAX_SIZE_NAME)),
  folderId: z.string().nonempty(REQUIRED_FIELD),
  serviceId: z.string().nonempty(REQUIRED_FIELD),
  typeId: z.string().nonempty(REQUIRED_FIELD),
  measurement: z.string().nonempty(REQUIRED_FIELD),
  integrationType: z.string().nonempty(REQUIRED_FIELD),
  status: z.string().nonempty(REQUIRED_FIELD),
  description: z
    .string()
    .nonempty(REQUIRED_FIELD)
    .min(MIN_SIZE, minSize(MIN_SIZE))
    .max(MAX_SIZE_DESCRIPTION, maxSize(MAX_SIZE_DESCRIPTION)),
  quota: z
    .string()
    .nonempty(REQUIRED_FIELD)
    .min(MIN_SIZE_QUOTA, minSize(MIN_SIZE_QUOTA))
    .max(MAX_SIZE_QUOTA, maxSize(MAX_SIZE_QUOTA)),
});

export const clauseChangeResource = z
  .object({
    quotaPlus: z
      .string()
      .optional()
      .refine(value => value === undefined || value.length <= MAX_SIZE_QUOTA, {
        message: maxSize(MAX_SIZE_QUOTA),
      }),
    quotaMinus: z
      .string()
      .optional()
      .refine(value => value === undefined || value.length <= MAX_SIZE_QUOTA, {
        message: maxSize(MAX_SIZE_QUOTA),
      }),
    resourceId: z.string().nonempty(REQUIRED_FIELD),
    serviceId: z.string().nonempty(REQUIRED_FIELD),
    comment: z
      .string()
      .nonempty(REQUIRED_FIELD)
      .min(MIN_SIZE, minSize(MIN_SIZE))
      .max(MAX_SIZE_COMMENT, maxSize(MAX_SIZE_COMMENT)),
  })
  .transform(data => {
    if (!data.quotaPlus && !data.quotaMinus) {
      throw new z.ZodError([
        {
          path: ['quotaPlus'],
          message: REQUIRED_FIELD,
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
        },
        {
          path: ['quotaMinus'],
          message: REQUIRED_FIELD,
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
        },
      ]);
    }
    return data;
  });
export const clauseShortChangeResource = z
  .object({
    folder: z.string().or(z.literal('')),
    quotaPlus: z
      .string()
      .optional()
      .refine(value => value === undefined || value.length <= MAX_SIZE_QUOTA, {
        message: maxSize(MAX_SIZE_QUOTA),
      }),
    quotaMinus: z
      .string()
      .optional()
      .refine(value => value === undefined || value.length <= MAX_SIZE_QUOTA, {
        message: maxSize(MAX_SIZE_QUOTA),
      }),
    resourceId: z.string().or(z.literal('')),
    serviceId: z.string().or(z.literal('')),
    comment: z
      .string()
      .nonempty(REQUIRED_FIELD)
      .min(MIN_SIZE, minSize(MIN_SIZE))
      .max(MAX_SIZE_COMMENT, maxSize(MAX_SIZE_COMMENT)),
  })
  .transform(data => {
    if (!data.quotaPlus && !data.quotaMinus) {
      throw new z.ZodError([
        {
          path: ['quotaPlus'],
          message: REQUIRED_FIELD,
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
        },
        {
          path: ['quotaMinus'],
          message: REQUIRED_FIELD,
          code: 'invalid_type',
          expected: 'string',
          received: 'undefined',
        },
      ]);
    }
    return data;
  });

export const clauseRedirectResourceQuota = z.object({
  comment: z
    .string()
    .nonempty(REQUIRED_FIELD)
    .min(MIN_SIZE, minSize(MIN_SIZE))
    .max(MAX_SIZE_COMMENT, maxSize(MAX_SIZE_COMMENT)),
  folder: z.string().nonempty(REQUIRED_FIELD),
  resourceId: z.string().nonempty(REQUIRED_FIELD),
  quota: z
    .string()
    .nonempty(REQUIRED_FIELD)
    .min(MIN_SIZE_QUOTA, minSize(MIN_SIZE_QUOTA))
    .max(MAX_SIZE_QUOTA, maxSize(MAX_SIZE_QUOTA)),
  serviceFromId: z.string().nonempty(REQUIRED_FIELD),
  serviceToId: z.string().nonempty(REQUIRED_FIELD),
});

export const requestResourceDialog = z.object({
  serviceFromId: z.string().nonempty(REQUIRED_FIELD),
  resourceId: z.string().nonempty(REQUIRED_FIELD),
  quota: z
    .string()
    .nonempty(REQUIRED_FIELD)
    .min(MIN_SIZE_QUOTA, minSize(MIN_SIZE_QUOTA))
    .max(MAX_SIZE_QUOTA, maxSize(MAX_SIZE_QUOTA)),
  consumption: z
    .string()
    .nonempty(REQUIRED_FIELD)
    .min(MIN_SIZE_QUOTA, minSize(MIN_SIZE_QUOTA))
    .max(MAX_SIZE_CONSUMPTION, maxSize(MAX_SIZE_CONSUMPTION)),
  folder: z.string().nonempty(REQUIRED_FIELD),
  serviceToId: z.string().nonempty(REQUIRED_FIELD),
});

export const giveResource = z.object({
  consumption: z
    .string()
    .nonempty(REQUIRED_FIELD)
    .min(MIN_SIZE_QUOTA, minSize(MIN_SIZE_QUOTA))
    .max(MAX_SIZE_CONSUMPTION, maxSize(MAX_SIZE_CONSUMPTION)),
  quota: z
    .string()
    .nonempty(REQUIRED_FIELD)
    .min(MIN_SIZE_QUOTA, minSize(MIN_SIZE_QUOTA))
    .max(MAX_SIZE_QUOTA, maxSize(MAX_SIZE_QUOTA)),
  resourceId: z.string().nonempty(REQUIRED_FIELD),
  serviceFromId: z.string().nonempty(REQUIRED_FIELD),
  serviceToId: z.string().nonempty(REQUIRED_FIELD),
});

export const giveOwnResource = z.object({
  consumption: z
    .string()
    .nonempty(REQUIRED_FIELD)
    .min(MIN_SIZE_QUOTA, minSize(MIN_SIZE_QUOTA))
    .max(MAX_SIZE_CONSUMPTION, maxSize(MAX_SIZE_CONSUMPTION)),
  resourceId: z.string().nonempty(REQUIRED_FIELD),
  serviceFromId: z.string().nonempty(REQUIRED_FIELD),
  serviceToId: z.string().nonempty(REQUIRED_FIELD),
});
