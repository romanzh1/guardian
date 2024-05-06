import { buildQuery } from 'src/libs';
import * as api from '../../requests';

export const useCategoryUnit = buildQuery(api.categoryUnit.get);
