import { Theme } from './schemas';
import { LocalStorageType } from './types';

export const initState: LocalStorageType = {
  userPreferences: {},
  lastPreference: {
    theme: Theme.light,
    savePhone: false,
    phoneNumber: '',
  },
};
