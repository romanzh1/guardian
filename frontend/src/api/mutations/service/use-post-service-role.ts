import { buildMutation } from 'src/libs';
import * as api from '../../requests';

export const usePostServiceRole = buildMutation(api.serviceRole.post, {
  invalidQueries: [api.serviceRole.getList],
});
