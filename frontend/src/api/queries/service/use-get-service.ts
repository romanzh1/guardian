import { buildQuery } from 'src/libs';
import * as api from '../../requests';

export const useGetService = buildQuery(api.service.get);
