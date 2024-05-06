import { buildQuery } from 'src/libs';
import * as api from '../requests';

const initData = {
  user: {
    id: 0,
    first_name: '',
    last_name: '',
    middle_name: '',
    email: '',
    phone: 71111111111,
    birthday: '',
    gender: '',
    avatar: '',
  },
};

export const useGetPassportPersonalData = buildQuery(api.passport.personalData, initData);
