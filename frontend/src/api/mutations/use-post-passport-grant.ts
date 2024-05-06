import { buildMutation } from 'src/libs';
import * as api from '../requests';

export const usePostPassportGrant = buildMutation(api.passport.grant);
