import { buildMutation } from 'src/libs';
import * as api from '../../requests';

export const usePutConfigUnitProvider = buildMutation(api.configUnit.putProvider, {
  invalidQueries: [
    api.configUnit.getList,
    api.serviceConfigUnit.getConfigCategory,
    api.serviceConfigUnit.getConsumersList,
    api.serviceConfigUnit.getConsumptionList,
  ],
});
