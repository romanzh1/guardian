import { buildMutation } from 'src/libs';
import * as api from '../../requests';

export const usePostLoadConfigUnit = buildMutation(api.configUnit.postLoad, {
  invalidQueries: [api.configUnit.getList, api.serviceConfigUnit.getList],
});
