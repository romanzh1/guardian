import { buildQuery } from 'src/libs';
import * as api from '../../requests';

export const useGetServicePermissions = buildQuery(api.servicePermissions.getList);
