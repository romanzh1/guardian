import { buildMutation } from 'src/libs';
import * as api from '../../requests';

export const useDeleteTag = buildMutation(api.tag.delete, {
  invalidQueries: [api.tag.getList],
});
