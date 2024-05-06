import { buildMutation } from 'src/libs';
import * as api from '../../requests';

export const usePutServiceRole = buildMutation(api.serviceRole.put, {
  invalidQueries: [api.serviceRole.getList],
});
