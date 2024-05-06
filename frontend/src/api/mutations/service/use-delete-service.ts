import { buildMutation } from 'src/libs';
import * as api from '../../requests';

export const useDeleteService = buildMutation(api.service.delete, {
  invalidQueries: [api.service.getArchive],
});
