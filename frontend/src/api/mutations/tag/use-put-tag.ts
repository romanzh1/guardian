import { buildMutation } from 'src/libs';
import * as api from '../../requests';

export const usePutTag = buildMutation(api.tag.put, {
  invalidQueries: [api.tag.getList],
});
