import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { ServiceRole } from 'src/api/types';
import { initServiceRoleData } from 'src/api/queries/service';

const KEY = 'service-role';

export const serviceRoleState = atom<ServiceRole>({
  key: KEY,
  default: initServiceRoleData,
});

export const useServiceRoleData = () => useRecoilState(serviceRoleState);
export const useServiceRoleValue = () => useRecoilValue(serviceRoleState);
