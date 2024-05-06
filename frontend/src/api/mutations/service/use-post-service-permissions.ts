import { buildMutation } from 'src/libs';
import * as api from '../../requests';

export const usePostServicePermissions = buildMutation(api.servicePermissions.post);
