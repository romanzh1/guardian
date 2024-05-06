import * as z from 'zod';
import { MAX_SIZE_NAME, MIN_SIZE, REQUIRED_FIELD } from 'src/constants';
import { maxSize, minSize } from '../../utils';

const permissions = z.object({
  id: z.string(),
  name: z.string(),
});

export const servicePermissionsValidator = z.object({
  name: z.string().nonempty(REQUIRED_FIELD).min(MIN_SIZE, minSize(MIN_SIZE)).max(MAX_SIZE_NAME, maxSize(MAX_SIZE_NAME)),
  global: z.array(permissions).optional(),
  service: z.array(permissions).optional(),
  time: z.string().optional().nullable(),
});
