import React, { memo, useCallback, useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import { Accept } from 'react-dropzone';
import { Tooltip } from 'src/shared/components';
import { DndArea } from '../dnd-area';
import { S3FilePreview } from '../s3-file-preview';
import styles from './index.module.scss';

type Props = {
  disabled?: boolean;
  maxFiles?: number;
  maxSize?: number;
  accept?: Accept;
  onChange?: (files: Array<File>) => void;
  hint?: string;
  initFiles?: Array<File>;
  title?: string;
  isError?: boolean;
};

export const S3DndArea = memo(
  ({ onChange, hint, disabled, maxFiles, maxSize, accept, initFiles = [], title, isError }: Props) => {
    const [files, setFiles] = useState<Array<File>>(initFiles);

    const dropMaxCount = maxFiles && maxFiles > 0 ? maxFiles - files.length : Infinity;

    const switchedOff = disabled || dropMaxCount === 0;
    useEffect(() => {
      if (isError) {
        setFiles([]);
      }
    }, [isError]);

    useEffect(() => {
      setFiles(initFiles);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (onChange) onChange(files);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [files]);

    const handleOnDrop = useCallback(
      (acceptedFiles: Array<File>) => {
        setFiles(acceptedFiles);
      },
      [setFiles],
    );

    const handleOnDelete = useCallback(
      (file: File) => {
        const index = files.findIndex(item => file.name === item.name);
        if (index > -1) {
          const newFiles = cloneDeep(files);
          newFiles.splice(index, 1);
          setFiles(newFiles);
        }
      },
      [files],
    );

    return (
      <div className={styles.root}>
        <div className={styles.dndArea}>
          <div className={styles.wrapper}>
            <DndArea
              accept={accept}
              disabled={switchedOff}
              maxFiles={dropMaxCount}
              maxSize={maxSize}
              onDrop={handleOnDrop}
              title={title}
            />
          </div>
          {hint && <Tooltip color="secondary" fontSize="small" title={hint} />}
        </div>
        <div className={styles.previewList}>
          {files.map(file => (
            <S3FilePreview key={file.name} file={file} onDelete={handleOnDelete} />
          ))}
        </div>
      </div>
    );
  },
);
