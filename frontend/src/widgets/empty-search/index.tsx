import { memo } from 'react';
import image from 'src/static/img/search.png';
import styles from './index.module.scss';

export const EmptySearch = memo(() => {
  return (
    <div className={styles.root}>
      <img alt="ALT" className={styles.image} src={image} />
    </div>
  );
});
