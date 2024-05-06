import { buildQuery } from 'src/libs';
import * as api from '../../requests';

export const useGetServiceEntrypoint = buildQuery(api.service.getEntrypoint, []);
