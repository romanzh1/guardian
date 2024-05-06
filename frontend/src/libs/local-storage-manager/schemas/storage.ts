import * as z from 'zod';
import { Theme } from './constants';
import { userPreference } from './user-preference';

export const storage = z.object({
  userPreferences: z.record(z.string(), userPreference).optional(),
  lastPreference: z.object({
    theme: z.nativeEnum(Theme).default(Theme.light),
    savePhone: z.boolean().default(false),
    phoneNumber: z.string().default(''),
  }),
});
