import * as z from 'zod';
import { RouteNodeState } from 'route-node';
import { forOwn } from 'lodash';
import { Params } from 'router5/dist/types/base';

type ParamType = 'query' | 'url';

export const getParamsType = (routeNodeState: RouteNodeState): Record<string, ParamType> => {
  const values = Object.values(routeNodeState.meta);
  const params = {};
  Object.assign(params, ...values);

  return params;
};

export const getDefaultParams = (schema: z.AnyZodObject): Record<string, any> => {
  const defaultParams: Record<string, any> = {};

  Object.entries(schema.shape).forEach(([key, value]) => {
    const defaultValue = (value as z.ZodTypeAny).safeParse(undefined);
    if (defaultValue.success) defaultParams[key] = defaultValue.data;
  });

  return defaultParams;
};

export const getQueryParams = (defaultParams: Params, paramsType: Record<string, ParamType>): Params => {
  const newRouteParams: Record<string, any> = {};

  forOwn(defaultParams as Record<string, any>, (value, key) => {
    if (paramsType[key] !== 'url') newRouteParams[key] = value;
  });

  return newRouteParams;
};

export const deleteDefaultParams = (initParams: Params, defaultParams: Params): Params => {
  const newRouteParams: Record<string, any> = {};

  forOwn(initParams as Record<string, any>, (value, key) => {
    if (!(defaultParams[key] !== undefined && defaultParams[key] === value)) {
      newRouteParams[key] = value;
    }
  });

  return newRouteParams;
};
