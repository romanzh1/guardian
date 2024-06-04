import { buildQuery } from 'src/libs';
import * as api from '../../requests';

export const useGetSecureNotesList = buildQuery(api.guardian.secureNote.getList, []);
