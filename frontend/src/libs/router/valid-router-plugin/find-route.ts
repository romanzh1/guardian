import { Route, Routes } from '../types';

const MAX_ITERATIONS = 1000;

export const findRoute = (routes: Routes, name: string): Route | undefined => {
  let flatRoutes: Array<any> = [...routes];
  let index = 0;
  let iteration = 0;
  while (index <= flatRoutes.length - 1 && iteration < MAX_ITERATIONS) {
    if (flatRoutes[index].children) {
      const newChildren: Routes = [];
      // eslint-disable-next-line no-loop-func
      flatRoutes[index].children?.forEach((item: Route) => {
        newChildren.push({ ...item, name: `${flatRoutes[index].name}.${item.name}` });
      });
      const { children, ...restOfRoute } = flatRoutes[index];
      const start = flatRoutes.slice(0, index);
      const end = flatRoutes.slice(index + 1);
      flatRoutes = [...start, restOfRoute, ...newChildren, ...end];
    } else {
      index += 1;
    }
    iteration += 1;
  }
  const foundRoute = flatRoutes.find(item => item.name === name);

  return foundRoute;
};
