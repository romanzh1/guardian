import { buildMutation } from 'src/libs';
import * as api from '../requests';

export const usePostPassportLoginByPhone = buildMutation(api.passport.loginByPhone);
