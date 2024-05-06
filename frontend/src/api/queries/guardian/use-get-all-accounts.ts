import { buildQuery } from 'src/libs';
import * as api from '../../requests';

export const useGetAllAccounts = buildQuery(api.guardian.allItems.getList, []);
