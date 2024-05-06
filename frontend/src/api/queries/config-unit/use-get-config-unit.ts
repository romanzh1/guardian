import { buildQuery } from 'src/libs';
import * as api from '../../requests';

export const useGetConfigUnit = buildQuery(api.configUnit.get);
