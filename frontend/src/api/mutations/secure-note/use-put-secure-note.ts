import { buildMutation } from 'src/libs';
import * as api from '../../requests/guardian';

export const usePutSecureNote = buildMutation(api.secureNote.put, {
  invalidQueries: [api.secureNote.getList],
});
