import { GetValidParamsFn } from './create-get-valid-params';
import { GetRouteNameFn } from './get-route-name';
import { IsRouteFn } from './create-is-route';
import { ValidNavigateFn } from './create-valid-navigate';
import { BuildValidUrlFn } from './create-build-valid-url';
import { BuildValidPathFn } from './create-build-valid-path';

declare module 'router5' {
  interface Router {
    getValidParams: GetValidParamsFn;
    isRoute: IsRouteFn;
    getRouteName: GetRouteNameFn;
    validNavigate: ValidNavigateFn;
    buildValidUrl: BuildValidUrlFn;
    buildValidPath: BuildValidPathFn;
  }
}
