import * as z from 'zod';
import { REQUIRED_FIELD } from 'src/constants';

const direction = z.object({
  id: z.string(),
  name: z.string(),
});

const groups = z.object({
  groupId: z.string().nonempty(REQUIRED_FIELD),
  roleId: z.string().nonempty(REQUIRED_FIELD),
});

export const newUserValidation = z.object({
  user: z.string().nonempty(REQUIRED_FIELD),
  directions: z.array(direction).optional(),
  groups: z.array(groups),
});
