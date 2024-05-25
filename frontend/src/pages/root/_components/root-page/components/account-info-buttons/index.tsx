import React from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './index.module.scss';

// @ts-ignore
export const AccountInfoButtons = ({ onEditClick }) => {
    return (
        <div className={styles.actionButtons}>
            <div className={styles.leftButtons}>
                <Button className={styles.actionButton}
                        variant="outlined"
                        color="primary"
                        startIcon={<EditIcon />}
                        onClick={onEditClick}
                >
                    Edit
                </Button>
                <Button className={styles.actionButton}
                        variant="outlined"
                        color="primary"
                        startIcon={<FileCopyIcon />}
                >
                    Clone
                </Button>
            </div>
            <Button className={styles.rightButtons}
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
            >
                Delete
            </Button>
        </div>
    );
};
