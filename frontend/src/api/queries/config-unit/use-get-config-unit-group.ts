import { buildQuery } from 'src/libs';
import * as api from '../../requests';

export const useGetConfigUnitGroup = buildQuery(api.configUnitGroup.get);
