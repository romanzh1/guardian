import { buildMutation } from 'src/libs';
import * as api from '../../requests/guardian';

export const usePutAccount = buildMutation(api.account.put, {
  invalidQueries: [api.account.getList],
});
