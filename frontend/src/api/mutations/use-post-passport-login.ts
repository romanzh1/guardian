import { buildMutation } from 'src/libs';
import * as api from '../requests';

export const usePostPassportLogin = buildMutation(api.passport.login);
