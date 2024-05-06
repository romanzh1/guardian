import { buildMutation } from 'src/libs';
import * as api from '../../requests';

export const usePostUnzipService = buildMutation(api.service.postUnzip, {
  invalidQueries: [api.service.getArchive, api.service.getList],
});
