import { buildMutation } from 'src/libs';
import * as api from '../../requests/guardian';

export const usePostSecureNote = buildMutation(api.secureNote.post, {
  invalidQueries: [api.secureNote.getList],
});
