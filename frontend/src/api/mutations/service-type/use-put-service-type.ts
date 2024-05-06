import { buildMutation } from 'src/libs';
import * as api from '../../requests';

export const usePutServiceType = buildMutation(api.serviceType.put, {
  invalidQueries: [api.serviceType.getList],
});
