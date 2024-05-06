import { Router } from 'router5';
import { RouteNodeList } from './types';

export type IsRouteFn = <T extends RouteNodeList | Array<RouteNodeList>>(...nodeName: Array<T>) => boolean;

export const createIsRoute =
  (router: Router): IsRouteFn =>
  (...nodeNames) => {
    const route = router.getState();

    for (let i = 0; i < nodeNames.length; i += 1) {
      if (nodeNames[i] === route.name) return true;
    }
    return false;
  };
