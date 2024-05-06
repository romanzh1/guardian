import { buildQuery } from 'src/libs';
import * as api from '../requests';

export const useGetOwner = buildQuery(api.user.getOwner);
