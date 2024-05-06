import { buildMutation } from 'src/libs';
import * as api from '../../requests';

export const useDeleteServiceType = buildMutation(api.serviceType.delete, {
  invalidQueries: [api.serviceType.getList],
});
