import { buildMutation } from 'src/libs';
import * as api from '../requests';

export const usePutGlobalRole = buildMutation(api.globalRole.put);
