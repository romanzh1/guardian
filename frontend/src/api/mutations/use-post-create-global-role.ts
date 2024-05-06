import { buildMutation } from 'src/libs';
import * as api from '../requests';

export const usePostCreateGlobalRole = buildMutation(api.globalRole.postCreate);
