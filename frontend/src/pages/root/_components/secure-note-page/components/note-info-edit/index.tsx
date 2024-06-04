import React, { memo, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Box, Table, TableBody, TableCell, Typography, IconButton, Paper, styled, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import { queries } from 'src/api';
import { useValidRouteParams } from 'src/libs';
import styles from './index.module.scss';
import { Params } from 'src/api/requests/guardian/secure-note/put';

const StyledTypographyLabel = styled(Typography)`
  font-size: 14px;
  color: #888;
`;

const StyledTableCell = styled(TableCell)`
  padding: 7px 14px;
`;

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    padding: '0 0',
    '& .MuiInputBase-input': {
      padding: '0',
    },
  },
  '& fieldset': {
    border: '0px',
  },
  '& .MuiInputLabel-root': {
    display: 'none',
  },
}));

const StyledCustomLabel = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    padding: '0 0',
    '& .MuiInputBase-input': {
      padding: '0',
      color: '#888',
      fontSize: '14px',
    },
  },
  '& fieldset': {
    border: '0px',
  },
  '& .MuiInputLabel-root': {
    display: 'none',
  },
}));

interface Field {
  label: string;
  value: string;
  index?: number;
}

interface SecureNoteEditProps {
  onSave: (formData: Params) => void;
}

export const SecureNoteEdit = memo(forwardRef(({ onSave }: SecureNoteEditProps, ref) => {
  const { id } = useValidRouteParams('root');
  const { data } = queries.guardian.useGetSecureNote({ id });
  const [standardFields, setStandardFields] = useState<{ [key: string]: string }>({
    name: data?.name || '',
    text: data?.text || ''
  });
  // const [isFavourite, setIsFavourite] = useState(data?.is_favourite || false);

  useEffect(() => {
    if (!data) return;

    setStandardFields({
      name: data.name || '',
      text: data.text || ''
    });
    // setIsFavourite(data.is_favourite || false);
  }, [data]);

  const handleStandardFieldChange = (key: string, value: string) => {
    setStandardFields((prev) => ({ ...prev, [key]: value }));
  };

  useImperativeHandle(ref, () => ({
    handleSave: () => {
      const formData: Params = {
        id: id!,
        body: {
          name: standardFields.name,
          // is_favourite: isFavourite,
          text: standardFields.text
        }
      };
      onSave(formData);
    }
  }));

  return (
      <Box className={styles.root}>
        {[
          {
            title: 'Item Information',
            fields: [
              { label: 'Name', value: standardFields.name },
            ]
          },
          {
            title: 'Note', fields: [
              { label: '', value: standardFields.text },
            ]
          },
        ].map((section, index) => (
            <Paper elevation={3} className={styles.block} key={index}>
              <Typography variant="h4" className={styles.header}>{section.title}</Typography>
              <Table>
                <TableBody>
                  {section.fields && section.fields.map((item: Field, idx) => (
                      <TableRow key={idx} className={styles.row}>
                        <StyledTableCell colSpan={2} className={styles.fullWidthCell}>
                          <div className={styles.value}>
                            <div className={styles.didi}>
                              <StyledTypographyLabel variant="subtext" className={styles.label}>{item.label}</StyledTypographyLabel>
                              <StyledTextField
                                  multiline
                                  value={item.value}
                                  onChange={(e) => {
                                    handleStandardFieldChange('text', e.target.value);
                                  }}
                                  fullWidth
                              />
                            </div>
                          </div>
                        </StyledTableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
        ))}
        {/*<FormControlLabel*/}
        {/*    control={<Checkbox checked={isFavourite} onChange={(e) => setIsFavourite(e.target.checked)} />}*/}
        {/*    label="Favourite"*/}
        {/*/>*/}
      </Box>
  );
}));
