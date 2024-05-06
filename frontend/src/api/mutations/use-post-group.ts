import { buildMutation } from 'src/libs';
import * as api from '../requests';

export const usePostGroup = buildMutation(api.group.post, {
  invalidQueries: [api.group.getList],
});
