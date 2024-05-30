import { buildMutation } from 'src/libs';
import * as api from '../../requests/guardian';

export const usePostAccount = buildMutation(api.account.post, {
  invalidQueries: [api.account.getList],
});
