import { buildQuery } from 'src/libs';
import * as api from '../../requests';

export const useGetServiceArchive = buildQuery(api.service.getArchive, []);
