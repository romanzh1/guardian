import { buildQuery } from 'src/libs';
import * as api from '../requests';

export const initProfileData: api.user.get.Response = {
  senior_service_role: {
    senior_role: '',
  },
  user: {
    created_at: '',
    department: '',
    direction_id: '',
    first_name: '',
    id: '',
    last_name: '',
    middle_name: '',
    role: '',
  },
  user_contact: {
    phone: 0,
    rocket_chat: '',
  },
};
export const useGetProfile = buildQuery(api.user.get, initProfileData, { keepPreviousData: true });
