import { buildQuery } from 'src/libs';
import * as api from '../../requests';

export const useGetUser = buildQuery(api.guardian.user.get);
