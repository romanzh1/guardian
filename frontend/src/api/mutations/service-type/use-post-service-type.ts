import { buildMutation } from 'src/libs';
import * as api from '../../requests';

export const usePostServiceType = buildMutation(api.serviceType.post, {
  invalidQueries: [api.serviceType.getList],
});
