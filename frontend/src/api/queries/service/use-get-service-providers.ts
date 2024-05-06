import { buildQuery } from 'src/libs';
import * as api from '../../requests';

export const useGetServiceProviders = buildQuery(api.service.getProviders, []);
