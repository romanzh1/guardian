import * as z from 'zod';
import { REQUIRED_FIELD } from 'src/constants';

export const configUnitValidator = z.object({
  serviceId: z.string().nonempty(REQUIRED_FIELD),
  configUnits: z.array(z.object({ id: z.string(), name: z.string() })).nonempty(REQUIRED_FIELD),
});

export const configUnitProvider = z.object({
  provider: z.string().nonempty(REQUIRED_FIELD),
  checkedArr: z.array(z.string()).nonempty(REQUIRED_FIELD),
});
export const configUnitConsumer = z.object({
  checkedArr: z.array(z.string()).nonempty(REQUIRED_FIELD),
  consumers: z.array(z.object({ id: z.string(), name: z.string() })).nonempty(REQUIRED_FIELD),
});
