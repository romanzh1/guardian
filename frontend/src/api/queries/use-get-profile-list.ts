import { buildQuery } from 'src/libs';
import * as api from '../requests';

export const useGetProfileList = buildQuery(api.user.getList, []);
