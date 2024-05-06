import { buildQuery } from 'src/libs';
import * as api from '../../requests';

/*
const initialData = {
  id: '6550d84dba416d8e89194320',
  name: 'Amazon',
  password: '1111111',
  email: 'alex@gmail.com',
  user_name: 'Alex Johnson',
  websites: ['https://www.amazon.com/favicon.ico'],
};
*/

export const useGetAllAccountsById = buildQuery(api.guardian.allItems.get);
