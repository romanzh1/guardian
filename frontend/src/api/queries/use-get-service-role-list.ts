import { buildQuery } from 'src/libs';
import * as api from '../requests';

export const useGetServiceRoleList = buildQuery(api.serviceRole.getList, []);
