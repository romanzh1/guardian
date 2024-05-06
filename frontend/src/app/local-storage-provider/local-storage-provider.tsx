import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { localStorageManager } from 'src/libs/local-storage-manager/instance';
import { LocalStorageContext } from 'src/libs/local-storage-manager/local-storage-context';
import { LocalStorageType } from 'src/libs/local-storage-manager/types';

export const LocalStorageProvider = ({ children }: PropsWithChildren<{}>) => {
  const { current: lsManager } = useRef(localStorageManager);
  const [providerState, setProviderState] = useState<{ data: LocalStorageType }>({ data: lsManager.data });

  useEffect(() => {
    const id = lsManager.subscribe(state => {
      setProviderState({ data: state });
    });

    return () => {
      lsManager.unsubscribe(id);
    };
  }, [lsManager]);

  return <LocalStorageContext.Provider value={providerState}>{children}</LocalStorageContext.Provider>;
};
