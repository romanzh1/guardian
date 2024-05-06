import { buildQuery } from 'src/libs';
import * as api from '../requests';

export const usrGetServiceUserList = buildQuery(api.serviceUser.getUserList, []);
