import { buildMutation } from 'src/libs';
import * as api from '../requests';

export const usePutGroup = buildMutation(api.group.put, {
  invalidQueries: [api.group.getList],
});
