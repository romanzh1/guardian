import React, { memo } from 'react';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';
import { TablePaginationActionsProps } from '@mui/material/TablePagination/TablePaginationActions';

export const PaginationAction = memo(({ count, page, rowsPerPage, onPageChange, id }: TablePaginationActionsProps) => {
  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  return (
    <Box display="flex" id={`${id}-table-pagination`}>
      <IconButton disabled={page === 0} id={`${id}-table-pagination-back-btn`} onClick={handleBackButtonClick}>
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        id={`${id}-table-pagination-back-btn-next-btn`}
        onClick={handleNextButtonClick}
      >
        <KeyboardArrowRight />
      </IconButton>
    </Box>
  );
});
