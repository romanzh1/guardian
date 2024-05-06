import { buildQuery } from 'src/libs';
import * as api from '../requests';

export const useGetServiceRole = buildQuery(api.serviceRole.get);
