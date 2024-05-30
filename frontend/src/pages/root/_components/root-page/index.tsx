import { memo, useCallback, useState, useRef } from 'react';
import styles from './index.module.scss';
import { UserInfoTable } from './components/account-info-table';
import { UserInfoEdit } from './components/account-info-edit';
import { AccountInfoButtons } from './components/account-info-buttons';
import { AccountEditButtons } from './components/account-edit-buttons';
import { mutations } from 'src/api';
import { Params } from 'src/api/requests/guardian/account/put';

export const RootPage = memo(() => {
    const [editMode, setEditMode] = useState<boolean>(true);
    const { mutate: updateAccount } = mutations.account.usePutAccount();
    const userInfoEditRef = useRef<{ handleSave: () => void }>(null);

    const handleEditButtonClick = useCallback(() => {
        setEditMode(false);
    }, []);

    const handleCancelButtonClick = useCallback(() => {
        setEditMode(true);
    }, []);

    const handleSaveButtonClick = useCallback((formData: Params) => {
        updateAccount(formData, {
            onSuccess: () => {
                setEditMode(true);
            },
            onError: (error) => {
                console.error('Failed to update account:', error);
            },
        });
    }, [updateAccount]);

    const triggerSave = () => {
        if (userInfoEditRef.current) {
            userInfoEditRef.current.handleSave();
        }
    };

    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <div className={styles.tableWrapper}>
                    {editMode ? <UserInfoTable /> : <UserInfoEdit ref={userInfoEditRef} onSave={handleSaveButtonClick} />}
                </div>
            </div>
            <div className={styles.fixedButtons}>
                {editMode ? (
                    <AccountInfoButtons onEditClick={handleEditButtonClick} />
                ) : (
                    <AccountEditButtons onCancelClick={handleCancelButtonClick} onSaveClick={triggerSave} />
                )}
            </div>
        </div>
    );
});
