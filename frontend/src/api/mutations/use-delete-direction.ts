import { buildMutation } from 'src/libs';
import * as api from '../requests';

export const useDeleteDirection = buildMutation(api.direction.delete, {
  invalidQueries: [api.direction.getList],
});
