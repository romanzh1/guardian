import { CancelFn, DoneFn, NavigationOptions } from 'router5/dist/types/base';
import { Router } from 'router5';
import { GetOptionalParamsByRouteName, RouteNodeList } from './types';
import { findRoute } from './find-route';
import { deleteDefaultParams, getDefaultParams, getParamsType, getQueryParams } from './utils';

type Args<T extends RouteNodeList> = GetOptionalParamsByRouteName<T> extends undefined
  ? [T, DoneFn?] | [T, {}, DoneFn?] | [T, {}, NavigationOptions, DoneFn?]
  : [T, GetOptionalParamsByRouteName<T>, DoneFn?] | [T, GetOptionalParamsByRouteName<T>, NavigationOptions, DoneFn?];

export type ValidNavigateFn = <T extends RouteNodeList>(...args: Args<T>) => CancelFn;

export const createValidNavigate =
  (router: Router): ValidNavigateFn =>
  (...rest) => {
    const [arg1, arg2, arg3, arg4] = rest;

    if (arg1 && !arg2 && !arg3 && !arg4) {
      return router.navigate(arg1);
    }

    if (arg1 && arg2) {
      if (typeof arg2 === 'function') {
        return router.navigate(arg1, arg2);
      }

      const currentRoute = findRoute(router.getDependencies().routes, arg1);

      if (currentRoute && currentRoute.paramsSchema) {
        const prospectiveState = router.buildState(arg1, arg2);
        const paramsType = prospectiveState ? getParamsType(prospectiveState) : {};
        const defaultParams = getDefaultParams(currentRoute.paramsSchema);
        const queryDefaultParams = getQueryParams(defaultParams, paramsType);
        const newRouteParams = deleteDefaultParams(arg2, queryDefaultParams);

        return router.navigate(arg1, newRouteParams, arg3 as any, arg4 as any);
      }

      return router.navigate(arg1, arg2, arg3 as any, arg4 as any);
    }

    return () => {};
  };
