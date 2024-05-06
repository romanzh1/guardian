import { buildQuery } from 'src/libs';
import * as api from '../../requests';

export const useGetServiceType = buildQuery(api.serviceType.get);
