import { buildQuery } from 'src/libs';
import * as api from '../../requests';

export const useGetServiceStaff = buildQuery(api.service.getStaff, []);
