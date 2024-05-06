import { buildQuery } from 'src/libs';
import * as api from '../requests';

export const useGetGroupList = buildQuery(api.group.getList, []);
