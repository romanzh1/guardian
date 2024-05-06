import { IconButton, Typography } from '@mui/material';
import React, { memo, useCallback } from 'react';
import cn from 'classnames';
import { Clear, DescriptionOutlined } from '@mui/icons-material';
import { getLink } from 'src/shared/utils/get-link';
import styles from './index.module.scss';

type Props = {
  file: File;
  onDelete?: (file: File) => void;
};

export const S3FilePreview = memo(({ file, onDelete }: Props) => {
  const link = getLink(file.name);
  const isImage = file.type.startsWith('image');

  const handleOnDelete = useCallback(() => {
    if (onDelete) onDelete(file);
  }, [file, onDelete]);

  return (
    <div className={styles.root}>
      {isImage ? <img alt={file.name} className={styles.image} src={link} /> : <div className={styles.blank} />}
      <div className={cn(styles.controls, { [styles.controls_image]: isImage })}>
        <div className={styles.extension}>
          <DescriptionOutlined color="inherit" fontSize="large" />
        </div>
        <div className={styles.name}>
          <Typography fontWeight={600} variant="subtext">
            {file.name}
          </Typography>
          <Typography color="secondary" variant="subtext">
            {Math.round(file.size / 1000) * 0.001} МБ
          </Typography>
        </div>
        <IconButton onClick={handleOnDelete} size="small">
          <Clear color="secondary" fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
});
