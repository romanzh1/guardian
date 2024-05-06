import { ReactNode } from 'react';
import styles from './index.module.scss';

type Props = {
  tabs: ReactNode;
  content: ReactNode;
};

export const ContentWithTabsLayout = ({ content, tabs }: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.tabs}>{tabs}</div>
      <div>{content}</div>
    </div>
  );
};
