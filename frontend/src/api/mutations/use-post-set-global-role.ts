import { buildMutation } from 'src/libs';
import * as api from '../requests';

export const usePostSetGlobalRole = buildMutation(api.globalRole.postSet, {
  invalidQueries: [api.user.getList],
});
