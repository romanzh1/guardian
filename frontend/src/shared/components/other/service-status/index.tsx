import React, { memo, useMemo } from 'react';
import { Box, useTheme } from '@mui/material';
import { StatusBox } from './components';

type Props = {
  status: string;
  isTableStatus?: boolean;
};

export const ServiceStatus = memo(({ status, isTableStatus = false }: Props) => {
  const theme = useTheme();
  const { newStatus, development, preProd, production, closing, archived, unknown } = theme.palette.statusColor;

  const StatusComponent = useMemo(() => {
    switch (status.toLowerCase()) {
      case 'новый':
        return <StatusBox background={newStatus} isTable={isTableStatus} status={status} />;
      case 'в разработке':
        return <StatusBox background={development} isTable={isTableStatus} status={status} />;
      case 'запуск':
        return <StatusBox background={preProd} isTable={isTableStatus} status={status} />;
      case 'работает':
        return <StatusBox background={production} isTable={isTableStatus} status={status} />;
      case 'вывод':
        return <StatusBox background={closing} isTable={isTableStatus} status={status} />;
      case 'архивирован':
        return <StatusBox background={archived} isTable={isTableStatus} status={status} />;
      default:
        return <StatusBox background={unknown} isTable={isTableStatus} status={status} />;
    }
  }, [archived, closing, development, isTableStatus, newStatus, preProd, production, status, unknown]);

  return <Box>{StatusComponent}</Box>;
});
