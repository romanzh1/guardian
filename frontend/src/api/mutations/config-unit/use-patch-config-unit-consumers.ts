import { buildMutation } from 'src/libs';
import * as api from '../../requests';

export const usePatchConfigUnitConsumers = buildMutation(api.configUnit.patchConsumers, {
  invalidQueries: [
    api.configUnit.getList,
    api.serviceConfigUnit.getConfigCategory,
    api.serviceConfigUnit.getConsumersList,
    api.serviceConfigUnit.getConsumptionList,
  ],
});
