import { buildQuery } from 'src/libs';
import * as api from '../../requests';

export const useGetConfigUnitHistory = buildQuery(api.configUnit.getHistory, []);
