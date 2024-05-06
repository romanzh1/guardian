import { buildMutation } from 'src/libs';
import * as api from '../../requests';

export const useDeleteServiceUser = buildMutation(api.serviceUser.delete, {
  invalidQueries: [api.serviceUser.getGroupList, api.serviceUser.getUserList],
});
