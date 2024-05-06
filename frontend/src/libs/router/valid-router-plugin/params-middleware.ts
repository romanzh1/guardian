import { State } from 'router5';
import { Params } from 'router5/dist/types/base';
import { DefaultDependencies, MiddlewareFactory } from 'router5/dist/types/router';
import { RouteNodeList } from './types';
import { findRoute } from './find-route';

declare module 'router5' {
  interface State {
    validParams: Params | undefined;
    validName: RouteNodeList;
  }
}

export const paramsMiddleware: MiddlewareFactory<DefaultDependencies> = router => (toState: State, fromState, done) => {
  let validParams: Params | undefined;

  const currentRoute = findRoute(router.getDependencies().routes, toState.name);
  if (!currentRoute) {
    console.error(`Не получилось найти роут`);

    return;
  }

  if (currentRoute.paramsSchema) {
    const strictSchema = currentRoute.paramsSchema.strict();

    const strictSchemaResult = strictSchema.safeParse(toState.params);
    if (!strictSchemaResult.success) {
      strictSchemaResult.error.issues.forEach(issue => {
        if (issue.code === 'unrecognized_keys') {
          const keys = issue.keys.join(', ');
          // eslint-disable-next-line no-console
          console.log(`В параметрах роута есть неизвестные поля. Поля=[${keys}]`);
        }
      });
    }

    const stripSchema = currentRoute.paramsSchema.strip();
    const stripSchemaResult = stripSchema.safeParse(toState.params);
    if (stripSchemaResult.success) {
      validParams = stripSchemaResult.data;
    }
    if (!stripSchemaResult.success) {
      // eslint-disable-next-line no-console
      console.log(`Параметры роута ${toState.name} не соответствуют схеме. Объект ошибки: `, stripSchemaResult);
      validParams = undefined;
    }

    // eslint-disable-next-line no-param-reassign
    toState.validParams = validParams;
  }
  // eslint-disable-next-line no-param-reassign
  toState.validName = toState.name as RouteNodeList;

  done();
};
