import { buildQuery } from 'src/libs';
import * as api from '../../requests';

const initData = { data: [], pagination_params: { page: 0, total: 0, limit: 0 } };
export const useGetServiceTypeList = buildQuery(api.serviceType.getList, initData);
