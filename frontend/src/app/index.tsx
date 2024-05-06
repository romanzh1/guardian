/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { ConnectedPage } from 'src/libs/router/components';
import { LocalStorageProvider } from 'src/app/local-storage-provider/local-storage-provider';
import 'normalize.css';
import { WEB_MANIFEST } from 'src/features';
import { SelfMadeRouterProvider } from 'src/libs';
import { getQueryClient } from './query-client';
import { IsOffline } from './is-offline';
import { router } from './router-init';
import { SnackbarProvider } from './snackbar-provider';
import { ThemeProvider } from './theme-provider';

router.start();

// eslint-disable-next-line
console.debug('Version: ', process.env.REACT_APP_VERSION);

// eslint-disable-next-line
console.debug('Manifest: ', WEB_MANIFEST);

export const App = () => (
  <LocalStorageProvider>
    <RecoilRoot>
      <DndProvider backend={HTML5Backend}>
        <QueryClientProvider client={getQueryClient(router)}>
          <ThemeProvider>
            <SelfMadeRouterProvider router={router}>
              <SnackbarProvider>
                <IsOffline>
                  <ConnectedPage />
                </IsOffline>
              </SnackbarProvider>
            </SelfMadeRouterProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </DndProvider>
    </RecoilRoot>
  </LocalStorageProvider>
);
