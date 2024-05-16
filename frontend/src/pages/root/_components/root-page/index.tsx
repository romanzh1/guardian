import { memo, useCallback, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';
import styles from './index.module.scss';
import { UserInfoTable } from './components/account-info-table';
import { UserInfoEdit } from './components/account-info-edit';
import { IconButton } from '../../../../shared/components/inputs/icon-button';
import { AccountInfoButtons } from './components/account-info-buttons';

export const RootPage = memo(() => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const handleButtonToggle = useCallback(() => {
        setEditMode(!editMode);
    }, [editMode]);

    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <div className={styles.tableWrapper}>
                    {!editMode ? <UserInfoTable /> : <UserInfoEdit />}
                </div>
                <div className={styles.button}>
                    <IconButton onClick={handleButtonToggle}>
                        {!editMode ? (
                            <EditIcon color="secondary" fontSize="small" />
                        ) : (
                            <EditOffOutlinedIcon color="secondary" fontSize="small" />
                        )}
                    </IconButton>
                </div>
            </div>
            <div className={styles.fixedButtons}>
                <AccountInfoButtons />
            </div>
        </div>
    );
});
