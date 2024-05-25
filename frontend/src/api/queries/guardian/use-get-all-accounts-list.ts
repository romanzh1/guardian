import { buildQuery } from 'src/libs';
import * as api from '../../requests';

export const useGetAccountsList = buildQuery(api.guardian.account.getList, []);
