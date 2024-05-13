import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import VaultIcon from '@mui/icons-material/Lock';  // Предположим, что используется иконка замка
import SendIcon from '@mui/icons-material/Send';

const FooterActions = () => {
  return (
      <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: 2, bgcolor: 'background.paper' }}>
        <Button startIcon={<VaultIcon />} variant="contained">My Vault</Button>
        <Button startIcon={<SendIcon />} variant="contained">Send</Button>
        <IconButton color="primary" aria-label="add">
          <AddIcon />
        </IconButton>
        <IconButton color="primary" aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton color="primary" aria-label="copy">
          <FileCopyIcon />
        </IconButton>
        <IconButton color="error" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Box>
  );
};

export default FooterActions;
