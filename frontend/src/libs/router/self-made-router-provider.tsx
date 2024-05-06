import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { routeContext, routerContext } from 'react-router5';
import { Router } from 'router5';
import { RouteState, UnsubscribeFn } from 'react-router5/dist/types';

type Props = {
  router: Router;
  children: ReactNode;
};

export const SelfMadeRouterProvider = ({ router, children }: Props) => {
  const [routeState, setRouteState] = useState<RouteState>({
    route: router.getState(),
    previousRoute: null,
  });

  useEffect(() => {
    const unsubscribe = router.subscribe(setRouteState) as UnsubscribeFn;

    return () => unsubscribe();
  }, [router]);

  const routeContextValue = useMemo(() => ({ router, ...routeState }), [routeState, router]);

  return (
    <routerContext.Provider value={router}>
      <routeContext.Provider value={routeContextValue}>{children}</routeContext.Provider>
    </routerContext.Provider>
  );
};
