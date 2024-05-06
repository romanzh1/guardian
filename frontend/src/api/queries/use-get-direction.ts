import { buildQuery } from 'src/libs';
import * as api from '../requests';

export const useGetDirection = buildQuery(api.direction.get);
