import { ComponentType, PropsWithChildren, ReactElement } from 'react';
import { Route as BaseRoute } from 'router5';
import { DefaultDependencies } from 'router5/dist/types/router';
import * as z from 'zod';

export type PageProps = {
  content?: ReactElement | null;
};

export type Route<Dependencies extends DefaultDependencies = DefaultDependencies> = Omit<
  BaseRoute<Dependencies>,
  'children'
> & {
  title?: string;
  Component: ComponentType<PageProps>;
  children?: Array<Route<Dependencies>>;
  Verification?: ComponentType<PropsWithChildren<any>>;
  paramsSchema?: z.AnyZodObject;
};

export type Routes<Dependencies extends DefaultDependencies = DefaultDependencies> = Array<Route<Dependencies>>;
