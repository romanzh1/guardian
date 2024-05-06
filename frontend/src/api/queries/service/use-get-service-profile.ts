import { buildQuery } from 'src/libs';
import * as api from '../../requests';

export const initServiceRoleData: api.service.getProfile.Response = {
  description: '',
  id: '',
  name: '',
  base: '',
  created_at: '',
};

export const useGetServiceProfile = buildQuery(api.service.getProfile, initServiceRoleData);
