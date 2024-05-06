import { Router } from 'router5';
import { ParamsError } from './params-error';
import { GetParamsByRouteName, RouteNodeList } from './types';

type ValidParamsOptions = {
  useErrorBoundary?: boolean;
};

export type GetValidParamsFn = <T extends RouteNodeList>(
  nodeName: T,
  options?: ValidParamsOptions,
) => GetParamsByRouteName<T>;

const defaultOptions: ValidParamsOptions = {
  useErrorBoundary: true,
};

export const createGetValidParams =
  (router: Router): GetValidParamsFn =>
  (nodeName, options) => {
    const route = router.getState();

    const { useErrorBoundary } = options || defaultOptions;

    if (nodeName !== route.name && useErrorBoundary)
      throw new ParamsError(
        `Неправильное название роута. Вы находитесь ${route.name}, а пытаетесь получить параметры из ${nodeName}`,
      );

    if (!route.validParams && useErrorBoundary) throw new ParamsError('Неправильные параметры роута');

    return route.validParams as GetParamsByRouteName<typeof nodeName>;
  };
