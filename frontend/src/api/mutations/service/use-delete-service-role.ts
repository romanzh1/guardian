import { buildMutation } from 'src/libs';
import * as api from '../../requests';

export const useDeleteServiceRole = buildMutation(api.serviceRole.delete, {
  invalidQueries: [api.serviceRole.getList],
});
