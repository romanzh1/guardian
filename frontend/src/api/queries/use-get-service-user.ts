import { buildQuery } from 'src/libs';
import * as api from '../requests';

export const useGetServiceUser = buildQuery(api.serviceUser.get);
