import { buildQuery } from 'src/libs';
import * as api from '../../requests';

const initData = {
  data: [],
  pagination_params: { page: 0, total: 0, limit: 0 },
  sort_params: { sort_by: '', sort_dir: '' },
};

export const useGetServiceCategory = buildQuery(api.service.getCategory, initData);
