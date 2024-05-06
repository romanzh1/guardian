import { buildQuery } from 'src/libs';
import * as api from '../../requests';

export const useGetServiceHistory = buildQuery(api.history.getService, []);
