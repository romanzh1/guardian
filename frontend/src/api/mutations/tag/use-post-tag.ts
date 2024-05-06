import { buildMutation } from 'src/libs';
import * as api from '../../requests';

export const usePostTag = buildMutation(api.tag.post, {
  invalidQueries: [api.tag.getList],
});
