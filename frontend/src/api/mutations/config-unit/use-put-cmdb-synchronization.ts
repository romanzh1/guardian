import { buildMutation } from 'src/libs';
import * as api from '../../requests';

export const usePutCmdbSynchronization = buildMutation(api.cmdbConnector.put, {
  invalidQueries: [
    api.configUnit.getList,
    api.serviceConfigUnit.getList,
    api.categoryUnit.getList,
    api.configUnitGroup.getList,
  ],
});
