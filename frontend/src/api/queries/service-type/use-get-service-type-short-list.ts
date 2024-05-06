import { buildQuery } from 'src/libs';
import * as api from '../../requests';

export const useGetServiceTypeShortList = buildQuery(api.serviceType.getShortList, []);
