import { buildQuery } from 'src/libs';
import * as api from '../requests';

export const useGetOwnerList = buildQuery(api.user.getOwnerList, []);
