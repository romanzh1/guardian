import React from 'react';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './index.module.scss';

// @ts-ignore
export const AccountEditButtons = ({ onCancelClick }) => {
    return (
        <div className={styles.actionButtons}>
            <div className={styles.leftButtons}>
                <Button className={styles.actionButton}
                        variant="outlined"
                        color="primary"
                        startIcon={<SaveIcon />}
                >
                    Save
                </Button>
                <Button className={styles.actionButton}
                        variant="outlined"
                        color="secondary"
                        startIcon={<CancelIcon />}
                        onClick={onCancelClick}
                >
                    Cancel
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
