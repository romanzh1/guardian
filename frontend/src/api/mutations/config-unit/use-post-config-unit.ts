import { buildMutation } from 'src/libs';
import * as api from '../../requests';

export const usePostConfigUnit = buildMutation(api.configUnit.post, {
  invalidQueries: [api.configUnit.getList],
});
