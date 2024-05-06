import { useCallback, useState } from 'react';

export const useConfirmModal = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, [setIsModalOpen]);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const createApplyClick = (callback: (...args: any[]) => any) => {
    return () => {
      callback();
      setIsModalOpen(false);
    };
  };

  return { isModalOpen, openModal, closeModal, createApplyClick };
};
