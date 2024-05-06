import { RouteNodeList } from './types';

export type GetRouteNameFn = <T extends RouteNodeList>(nodeName: T) => T;

export const getRouteName: GetRouteNameFn = nodeName => nodeName;
