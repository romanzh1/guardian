import { buildMutation } from 'src/libs';
import * as api from '../requests';

export const usePostDirection = buildMutation(api.direction.post, {
  invalidQueries: [api.direction.getList],
});
