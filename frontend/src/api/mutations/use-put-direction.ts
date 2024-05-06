import { buildMutation } from 'src/libs';
import * as api from '../requests';

export const usePutDirection = buildMutation(api.direction.put, {
  invalidQueries: [api.direction.getList],
});
