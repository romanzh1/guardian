import { buildMutation } from 'src/libs';
import * as api from '../../requests';

export const usePostService = buildMutation(api.service.post, {
  invalidQueries: [api.service.getList],
});
