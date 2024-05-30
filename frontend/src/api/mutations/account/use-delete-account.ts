import { buildMutation } from 'src/libs';
import * as api from '../../requests/guardian';

export const useDeleteAccount = buildMutation(api.account.delete, {
  invalidQueries: [api.account.getList],
});
