import loggerPlugin from 'router5-plugin-logger';
import browserPlugin from 'router5-plugin-browser';
import { createRouter } from 'router5';
import { routes } from 'src/pages/routes';
import { Routes } from 'src/libs/router/types';
import { RouteNodeList, checkRoutes, validRouterPlugin } from 'src/libs/router/valid-router-plugin';

declare global {
  type GlobalRoutesType = typeof routes;
}

const checkedRoutes: Routes = checkRoutes(routes);

const defaultRoute: RouteNodeList = 'root';

export const router = createRouter(checkedRoutes, {
  defaultRoute,
  queryParamsMode: 'loose',
});

router.setDependencies({ routes, postfixTitle: 'Guardian' });
router.usePlugin(browserPlugin());
router.usePlugin(loggerPlugin);
router.usePlugin(validRouterPlugin);
router.start();
