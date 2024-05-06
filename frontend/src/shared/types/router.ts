import { ComponentType, PropsWithChildren, ReactElement } from 'react';
import { Route as BaseRoute } from 'router5';
import { DefaultDependencies } from 'router5/dist/types/router';
import { PageProps } from './page';

export type Route<Dependencies extends DefaultDependencies = DefaultDependencies> = BaseRoute<Dependencies> & {
  title?: string;
  Component: ComponentType<PageProps>;
  children?: Array<Route<Dependencies>>;
  errorChecker?: () => ReactElement | null;
  Verification?: ComponentType<PropsWithChildren<any>>;
};

export type Routes = Array<Route>;
