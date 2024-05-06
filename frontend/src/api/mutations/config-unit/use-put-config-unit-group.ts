import { buildMutation } from '../../../libs';
import * as api from '../../requests';

export const usePutConfigUnitGroup = buildMutation(api.configUnitGroup.put, {
  invalidQueries: [api.configUnitGroup.getList],
});
