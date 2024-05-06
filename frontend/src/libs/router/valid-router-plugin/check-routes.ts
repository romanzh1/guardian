import { MutableRoutes } from './types';

export const checkRoutes = <T extends ReadonlyArray<any>>(r: T): MutableRoutes<T> => r as MutableRoutes<T>;
