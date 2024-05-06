import React, { memo } from 'react';
import styles from './index.module.scss';

export const InitialAppPreloader = memo(() => (
  <div className={styles.root} id="icon-layout">
    <div className={styles.loadingIcon} id="loading-icon">
      <svg className={styles.circular} id="loading-circle" viewBox="25 25 50 50">
        <circle
          className={styles.path}
          cx="50"
          cy="50"
          fill="none"
          id="path"
          r="20"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
      </svg>
    </div>
  </div>
));
