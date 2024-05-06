import { buildQuery } from 'src/libs';
import * as api from '../../requests';

export const useGetServiceStatusList = buildQuery(api.service.getStatus, []);
