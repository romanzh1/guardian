import { buildQuery } from 'src/libs';
import * as api from '../requests';

export const useGetGroup = buildQuery(api.group.get);
