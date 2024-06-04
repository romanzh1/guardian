import { buildMutation } from 'src/libs';
import * as api from '../../requests/guardian';

export const useDeleteSecureNote = buildMutation(api.secureNote.delete, {
  invalidQueries: [api.secureNote.getList],
});
