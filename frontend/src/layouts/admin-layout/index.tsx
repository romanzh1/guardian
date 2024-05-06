import { ReactNode, PropsWithChildren } from 'react';
import styles from './index.module.scss';

type Props = {
  sidebar: ReactNode;
};

export const AdminLayout = ({ sidebar, children }: PropsWithChildren<Props>) => {
  return (
    <div className={styles.root}>
      <div className={styles.sidebar}>{sidebar}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
