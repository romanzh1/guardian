import { buildQuery } from 'src/libs';
import * as api from '../../requests';

export const useGetSecureNote = buildQuery(api.guardian.secureNote.get);
