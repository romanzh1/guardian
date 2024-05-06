import React, { useState } from 'react';
import { useRoute } from 'react-router5';
import { queries } from 'src/api';
import { GlobalErrorBoundary, RouteParamsErrorBoundary } from 'src/widgets';
import { InitialAppPreloader } from 'src/shared/components';
import { PageBuilder } from '../page-builder';

export const ConnectedPage = () => {
  const { router } = useRoute();
  const [isInit, setIsInit] = useState<boolean>(false);

  queries.guardian.useGetUser(
    { id: '5fb7a0450364f95b24c9d401' },
    {
      onSuccess: data => {
        // if (isInit && router.isRoute('login')) router.navigateToDefault();
      },
      onSettled: () => {
        if (isInit) setIsInit(false);
      },
      onError: () => {
        // router.validNavigate('login');
      },
    },
  );

  if (isInit) {
    return <InitialAppPreloader />;
  }

  return (
    <GlobalErrorBoundary>
      <RouteParamsErrorBoundary>
        <PageBuilder />
      </RouteParamsErrorBoundary>
    </GlobalErrorBoundary>
  );
};
