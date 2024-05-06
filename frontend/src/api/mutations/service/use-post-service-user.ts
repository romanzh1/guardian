import { buildMutation } from 'src/libs';
import * as api from '../../requests';

export const usePostServiceUser = buildMutation(api.serviceUser.post, {
  invalidQueries: [api.serviceUser.getGroupList, api.serviceUser.getUserList],
});
