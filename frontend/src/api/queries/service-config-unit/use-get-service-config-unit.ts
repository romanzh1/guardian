import { buildQuery } from 'src/libs';
import * as api from '../../requests';

export const useGetServiceConfigUnit = buildQuery(api.serviceConfigUnit.get);
