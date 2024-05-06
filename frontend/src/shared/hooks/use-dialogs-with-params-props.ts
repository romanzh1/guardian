import { useMemo, useState } from 'react';

type UpdateParams = {
  resourceId?: string;
  serviceId?: string;
};

export type DialogsParams = {
  visibleDelete: boolean;
  visibleUpdate: boolean;
  deleteId: string;
  resourceId: string;
  serviceId: string;
  onUpdateOpen: (params: UpdateParams) => void;
  onUpdateClose: () => void;
  onToggle: () => void;
  onDeleteOpen: (id: string) => void;
  onDeleteClose: () => void;
};
export const useDialogsWithParamsProps = (): DialogsParams => {
  const [visibleDelete, setVisibleDelete] = useState<boolean>(false);
  const [visibleUpdate, setVisibleUpdate] = useState<boolean>(false);
  const [resourceId, setResourceId] = useState<string>('');
  const [serviceId, setServiceId] = useState<string>('');
  const [deleteId, setDeleteId] = useState<string>('');

  return useMemo<DialogsParams>(
    () => ({
      visibleDelete,
      visibleUpdate,
      resourceId,
      serviceId,
      deleteId,
      onToggle: () => {
        setVisibleUpdate(!visibleUpdate);
      },
      onUpdateOpen: (params: UpdateParams) => {
        setVisibleUpdate(true);
        if (params.resourceId) {
          setResourceId(params.resourceId);
        }
        if (params.serviceId) {
          setServiceId(params.serviceId);
        }
      },
      onUpdateClose: () => {
        setVisibleUpdate(false);
        setResourceId('');
        setServiceId('');
      },
      onDeleteOpen: (id: string) => {
        setVisibleDelete(true);
        setDeleteId(id);
      },
      onDeleteClose: () => {
        setVisibleDelete(false);
        setDeleteId('');
      },
    }),
    [deleteId, resourceId, serviceId, visibleDelete, visibleUpdate],
  );
};
