import React from 'react';
import { useRoute } from 'react-router5';
import { usePageTitle } from '../../hooks';
import { Routes } from '../../types';
import { Page } from '../page';

export const PageBuilder = () => {
  const {
    route: { name: routeName },
    router,
  } = useRoute();

  const routeSegments: Array<string> = routeName.split('.');

  let currentRoute: Routes = [];
  let routeList: Routes = router.getDependencies().routes;

  const foundRoute = routeList.find(item => item.name === routeName);
  if (foundRoute) currentRoute = [foundRoute];
  else {
    for (let i = 0; i < routeSegments.length; i += 1) {
      const segment = routeSegments[i];
      const foundRoute2 = routeList.find(item => item.name === segment);
      if (foundRoute2) {
        currentRoute.push(foundRoute2);
        if (foundRoute2.children) {
          routeList = foundRoute2.children;
        }
      } else {
        console.error(`Не получилось найти сегмент "${segment}"  в маршруте ${routeName}`);
        break;
      }
    }
  }

  const lastNode = currentRoute[currentRoute.length - 1];
  if (lastNode?.title) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    usePageTitle(lastNode.title);
  }

  return <Page routes={currentRoute} />;
};
