/* eslint-disable no-param-reassign */
import { PluginFactory } from 'router5/dist/types/router';
import { createGetValidParams } from './create-get-valid-params';
import { getRouteName } from './get-route-name';
import { createIsRoute } from './create-is-route';
import { paramsMiddleware } from './params-middleware';
import { createValidNavigate } from './create-valid-navigate';
import { createBuildValidUrl } from './create-build-valid-url';
import { createBuildValidPath } from './create-build-valid-path';

export const validRouterPlugin: PluginFactory = router => {
  const onStart = () => {
    if (router) {
      router.getValidParams = createGetValidParams(router);
      router.validNavigate = createValidNavigate(router);
      router.buildValidUrl = createBuildValidUrl(router);
      router.buildValidPath = createBuildValidPath(router);
      router.getRouteName = getRouteName;
      router.isRoute = createIsRoute(router);
      router.useMiddleware(paramsMiddleware);
    }
  };

  return { onStart };
};
