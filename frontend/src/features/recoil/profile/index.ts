import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { Profile } from 'src/api/types';
import { initProfileData } from 'src/api/queries';

const KEY = 'profile';

export const profileState = atom<Profile>({
  key: KEY,
  default: initProfileData,
});

export const useProfileData = () => useRecoilState(profileState);
export const useProfileDataValue = () => useRecoilValue(profileState);
export const useProfileRole = () => useRecoilValue(profileState).user.role;
