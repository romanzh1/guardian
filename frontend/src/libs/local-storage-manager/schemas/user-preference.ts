import * as z from 'zod';
import { Theme } from './constants';

export const userPreference = z.object({
  theme: z.nativeEnum(Theme).default(Theme.light),
});
