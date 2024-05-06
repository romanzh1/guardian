import React, { Suspense, ReactElement } from 'react';
import { Routes } from '../../types';
import { Fallback } from '../fallback';

type Props = { routes: Routes };

export const Page = ({ routes }: Props) => {
  return routes.reduceRight<ReactElement | null>((page, route) => {
    const Child = React.createElement(route.Component, { content: page });
    const { Verification } = route;
    if (Verification) {
      return (
        <Suspense fallback={<Fallback />}>
          <Verification>{Child}</Verification>
        </Suspense>
      );
    }

    return <Suspense fallback={<Fallback />}>{Child}</Suspense>;
  }, null);
};
