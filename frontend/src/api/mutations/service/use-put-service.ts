import { buildMutation } from 'src/libs';
import * as api from '../../requests';

export const usePutService = buildMutation(api.service.put, {
  invalidQueries: [api.service.getList],
});
