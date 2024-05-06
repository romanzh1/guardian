import { buildQuery } from 'src/libs';
import * as api from '../../requests';

export const useGetTag = buildQuery(api.tag.get);
