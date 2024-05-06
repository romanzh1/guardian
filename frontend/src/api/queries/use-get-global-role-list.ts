import { buildQuery } from 'src/libs';
import * as api from '../requests';

export const useGetGlobalRole = buildQuery(api.globalRole.getList, []);
