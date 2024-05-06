import { Router } from 'router5';
import { GetOptionalParamsByRouteName, RouteNodeList } from './types';
import { findRoute } from './find-route';
import { deleteDefaultParams, getDefaultParams, getParamsType, getQueryParams } from './utils';

export type BuildValidUrlFn = <T extends RouteNodeList>(name: T, params: GetOptionalParamsByRouteName<T>) => string;

export const createBuildValidUrl =
  (router: Router): BuildValidUrlFn =>
  (name, params) => {
    const currentRoute = findRoute(router.getDependencies().routes, name);
    if (currentRoute && currentRoute.paramsSchema) {
      const prospectiveState = router.buildState(name, params);
      const paramsType = prospectiveState ? getParamsType(prospectiveState) : {};
      const defaultParams = getDefaultParams(currentRoute.paramsSchema);
      const queryDefaultParams = getQueryParams(defaultParams, paramsType);
      const newRouteParams = deleteDefaultParams(params, queryDefaultParams);
      return router.buildUrl(name, newRouteParams);
    }

    return router.buildUrl(name, params);
  };
