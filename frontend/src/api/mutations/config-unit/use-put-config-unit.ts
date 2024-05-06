import { buildMutation } from 'src/libs';
import * as api from '../../requests';

export const usePutConfigUnit = buildMutation(api.configUnit.put, {
  invalidQueries: [api.configUnit.getList, api.serviceConfigUnit.getConsumptionList, api.serviceConfigUnit.getList],
});
