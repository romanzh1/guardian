import { buildMutation } from 'src/libs';
import * as api from '../../requests';

export const usePutServiceUser = buildMutation(api.serviceUser.put, {
  invalidQueries: [api.serviceUser.getGroupList, api.serviceUser.getUserList],
});
