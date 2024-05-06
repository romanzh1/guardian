import { buildQuery } from 'src/libs';
import * as api from '../../requests';

export const useGetTagShortList = buildQuery(api.tag.getShortList, []);
