import { buildQuery } from 'src/libs';
import * as api from '../requests';

export const useGetDirectionList = buildQuery(api.direction.getList, []);
