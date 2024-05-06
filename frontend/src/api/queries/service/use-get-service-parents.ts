import { buildQuery } from 'src/libs';
import * as api from '../../requests';

export const useGetServiceParents = buildQuery(api.service.getParents, []);
