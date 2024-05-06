import React, { PropsWithChildren } from 'react';
import styles from './index.module.scss';
import { LayoutWithStyledScroll } from '../layout-with-styled-scroll';

type Props = {};

export const RootLayout = ({ children }: PropsWithChildren<Props>) => {
  return (
    <LayoutWithStyledScroll>
      <div className={styles.root}>{children}</div>
    </LayoutWithStyledScroll>
  );
};
