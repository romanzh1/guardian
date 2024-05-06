import * as z from 'zod';
import { globalRole } from './global-role';

export const globalRoleList = z.array(globalRole);
