import { buildMutation } from 'src/libs';
import * as api from '../../requests';

export const useDeleteConfigInitGroup = buildMutation(api.configUnitGroup.delete, {
  invalidQueries: [api.configUnitGroup.getList],
});
