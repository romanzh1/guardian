import { buildQuery } from 'src/libs';
import * as api from '../../requests';

export const useGetAllAccountsById = buildQuery(api.guardian.allItems.get);
