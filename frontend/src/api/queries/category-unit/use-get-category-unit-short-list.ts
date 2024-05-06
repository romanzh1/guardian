import { buildQuery } from 'src/libs';
import * as api from '../../requests';

export const useGetCategoryUnitShortList = buildQuery(api.categoryUnit.getShort, []);
