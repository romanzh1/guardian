import { useContext } from 'react';
import { LocalStorageContext } from './local-storage-context';

export const useLocalStorage = () => {
  const { data: storage } = useContext(LocalStorageContext);
  return storage;
};
