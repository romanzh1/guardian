import { buildQuery } from 'src/libs';
import * as api from '../requests';

export const usrGetServiceUserGroupList = buildQuery(api.serviceUser.getGroupList, []);
