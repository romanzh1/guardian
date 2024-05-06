import { useRoute } from 'react-router5';
import { GetValidParamsFn } from './create-get-valid-params';
import { ParamsError } from './params-error';
import { GetParamsByRouteName } from './types';

type ValidParamsOptions = {
  useErrorBoundary?: boolean;
};

const defaultOptions: ValidParamsOptions = {
  useErrorBoundary: true,
};

export const useValidRouteParams: GetValidParamsFn = (nodeName, options) => {
  const { route } = useRoute();
  const { useErrorBoundary } = options || defaultOptions;

  if (useErrorBoundary && !route.name.startsWith(nodeName))
    throw new ParamsError(
      `Неправильное название роута. Вы находитесь ${route.name}, а пытаетесь получить параметры из ${nodeName}`,
    );

  if (!route.validParams && useErrorBoundary) throw new ParamsError('Неправильные параметры роута');

  return route.validParams as GetParamsByRouteName<typeof nodeName>;
};
