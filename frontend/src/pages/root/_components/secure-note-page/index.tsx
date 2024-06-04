import { memo, useCallback, useState, useRef } from 'react';
import styles from './index.module.scss';
import { SecureNoteTable } from './components/note-info-table';
import { SecureNoteEdit } from './components/note-info-edit';
import { NoteInfoButtons } from './components/note-info-buttons';
import { NoteEditButtons } from './components/note-edit-buttons';
import { mutations } from 'src/api';
import { Params } from 'src/api/requests/guardian/secure-note/put';

export const SecureNotePage = memo(() => {
    const [editMode, setEditMode] = useState<boolean>(true);
    const { mutate: updateSecureNote } = mutations.secureNote.usePutSecureNote()
    const userInfoEditRef = useRef<{ handleSave: () => void }>(null);

    const handleEditButtonClick = useCallback(() => {
        setEditMode(false);
    }, []);

    const handleCancelButtonClick = useCallback(() => {
        setEditMode(true);
    }, []);

    const handleSaveButtonClick = useCallback((formData: Params) => {
        updateSecureNote(formData, {
            onSuccess: () => {
                setEditMode(true);
            },
            onError: (error) => {
                console.error('Failed to update account:', error);
            },
        });
    }, [updateSecureNote]);

    const triggerSave = () => {
        if (userInfoEditRef.current) {
            userInfoEditRef.current.handleSave();
        }
    };

    return (
        <div className={styles.root}>
            <div className={styles.content}>
                <div className={styles.tableWrapper}>
                    {editMode ? <SecureNoteTable /> : <SecureNoteEdit ref={userInfoEditRef} onSave={handleSaveButtonClick} />}
                </div>
            </div>
            <div className={styles.fixedButtons}>
                {editMode ? (
                    <NoteInfoButtons onEditClick={handleEditButtonClick} />
                ) : (
                    <NoteEditButtons onCancelClick={handleCancelButtonClick} onSaveClick={triggerSave} />
                )}
            </div>
        </div>
    );
});
