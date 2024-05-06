import { buildMutation } from 'src/libs';
import * as api from '../requests';

export const useDeleteGroup = buildMutation(api.group.delete, {
  invalidQueries: [api.group.getList],
});
