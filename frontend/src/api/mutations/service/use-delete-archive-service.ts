import { buildMutation } from 'src/libs';
import * as api from '../../requests';

export const useDeleteArchiveService = buildMutation(api.service.archive, {
  invalidQueries: [api.service.getList],
});
