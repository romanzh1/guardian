import { ReactNode } from 'react';
import styles from './index.module.scss';

type Props = {
  breadcrumbs: ReactNode;
  content: ReactNode;
};

export const BreadcrumbsLayout = ({ content, breadcrumbs }: Props) => {
  return (
    <div className={styles.root}>
      <div className={styles.breadcrumbs}>{breadcrumbs}</div>
      <div>{content}</div>
    </div>
  );
};
