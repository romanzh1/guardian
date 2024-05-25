import { memo, useCallback, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import EditOffOutlinedIcon from '@mui/icons-material/EditOffOutlined';
import styles from './index.module.scss';
import { UserInfoTable } from './components/account-info-table';
import { UserInfoEdit } from './components/account-info-edit';
import { IconButton } from '../../../../shared/components/inputs/icon-button';
import { AccountInfoButtons } from './components/account-info-buttons';
import { AccountEditButtons } from './components/account-edit-buttons';

export const RootPage = memo(() => {
    const [editMode, setEditMode] = useState<boolean>(true);

    const handleEditButtonClick = useCallback(() => {
        setEditMode(false);
    }, []);

    const handleCancelButtonClick = useCallback(() => {
        setEditMode(true);
    }, []);

    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <div className={styles.tableWrapper}>
                    {editMode ? <UserInfoTable /> : <UserInfoEdit />}
                </div>
            </div>
            <div className={styles.fixedButtons}>
                {editMode ? (
                    <AccountInfoButtons onEditClick={handleEditButtonClick} />
                ) : (
                    <AccountEditButtons onCancelClick={handleCancelButtonClick} />
                )}
            </div>
        </div>
    );
});
