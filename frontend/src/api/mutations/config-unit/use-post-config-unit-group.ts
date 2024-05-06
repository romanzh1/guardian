import { buildMutation } from '../../../libs';
import * as api from '../../requests';

export const usePostConfigUnitGroup = buildMutation(api.configUnitGroup.post, {
  invalidQueries: [api.configUnitGroup.getList],
});
