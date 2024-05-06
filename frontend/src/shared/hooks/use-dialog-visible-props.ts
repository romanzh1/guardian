import { useMemo, useState } from 'react';

export const useDialogVisibleProps = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return useMemo(
    () => ({
      visible,
      open: () => setVisible(true),
      close: () => setVisible(false),
      toggle: () => setVisible(v => !v),
    }),
    [visible],
  );
};
