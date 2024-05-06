import { ReactNode } from 'react';
import styles from './index.module.scss';

type Props = {
  info: ReactNode;
  tabs?: ReactNode;
  content: ReactNode;
};

export const ServiceContentWithTabsLayout = ({ content, tabs, info }: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.tabs}>{info}</div>
      <div className={styles.tabs}>{tabs}</div>
      <div>{content}</div>
    </div>
  );
};
