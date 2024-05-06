import { MouseEvent, useCallback, useState } from 'react';

type ReturnType = {
  isOpen: boolean;
  anchorElement: null | HTMLElement;
  handleClose: () => void;
  handleOpen: (event: MouseEvent<HTMLElement>) => void;
};

export const usePopoverProps = (): ReturnType => {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

  const handleClose = useCallback(() => {
    setAnchorElement(null);
  }, []);

  const handleOpen = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  }, []);

  return {
    isOpen: Boolean(anchorElement),
    anchorElement,
    handleClose,
    handleOpen,
  };
};
