import { buildMutation } from 'src/libs';
import * as api from '../../requests';

export const usePostImportService = buildMutation(api.service.postImport, {
  invalidQueries: [api.service.getList],
});
