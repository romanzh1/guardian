import { memo, useState } from 'react';
import { Box, Table, TableBody, TableCell, Typography, IconButton, Paper, styled, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import { queries } from 'src/api';
import { useValidRouteParams } from 'src/libs';
import styles from './index.module.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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
  secret: boolean;
  index?: number;
}

export const UserInfoEdit = memo(() => {
  const { id } = useValidRouteParams('root');
  const { data } = queries.guardian.useGetAccount({ id });
  const [websites, setWebsites] = useState<string[]>(data?.websites || []);
  const [customFields, setCustomFields] = useState<{ key: string; value: string; secret: boolean }[]>(data?.custom_fields || []);
  const [standardFields, setStandardFields] = useState<{ [key: string]: string }>({
    name: data?.name || '',
    username: data?.user_name || '',
    password: data?.password || ''
  });
  const [isFavourite, setIsFavourite] = useState(false);
  const [hiddenFields, setHiddenFields] = useState<{ [key: string]: boolean }>({});

  const handleAddWebsite = () => {
    setWebsites([...websites, '']);
  };

  const handleAddCustomField = () => {
    setCustomFields([...customFields, { key: '', value: '', secret: false }]);
  };

  const handleWebsiteChange = (index: number, value: string) => {
    const newWebsites = [...websites];
    newWebsites[index] = value;
    setWebsites(newWebsites);
  };

  const handleCustomFieldChange = (index: number, key: string, value: string) => {
    const newCustomFields = [...customFields];
    newCustomFields[index] = { ...newCustomFields[index], [key]: value };
    setCustomFields(newCustomFields);
  };

  const handleStandardFieldChange = (key: string, value: string) => {
    setStandardFields((prev) => ({ ...prev, [key]: value }));
  };

  const handleCustomLabelChange = (index: number, value: string) => {
    const newCustomFields = [...customFields];
    newCustomFields[index].key = value;
    setCustomFields(newCustomFields);
  };

  const toggleVisibility = (field: string) => {
    setHiddenFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

  if (data) {
    return (
        <Box className={styles.root}>
          {[
            {
              title: 'Item Information',
              fields: [
                { label: 'Name', value: standardFields.name, secret: false },
                { label: 'Username', value: standardFields.username, secret: false },
                { label: 'Password', value: standardFields.password, secret: true }
              ]
            },
            { title: 'Websites', fields: websites.map((website, idx) => ({ label: 'Website', value: website, secret: false, index: idx })) },
            { title: 'Custom Fields', fields: customFields.map((field, idx) => ({ label: field.key, value: field.value, secret: field.secret, index: idx })) }
          ].map((section, index) => (
              <Paper elevation={3} className={styles.block} key={index}>
                <Typography variant="h4" className={styles.header}>{section.title}</Typography>
                <Table>
                  <TableBody>
                    {section.fields && section.fields.map((item: Field, idx) => (
                        <TableRow key={idx} className={styles.row}>
                          <StyledTableCell colSpan={2} className={styles.fullWidthCell}>
                            <div className={styles.value}>
                              <div>
                                {section.title === 'Custom Fields' ? (
                                    <StyledCustomLabel
                                        value={item.label}
                                        onChange={(e) => handleCustomLabelChange(item.index!, e.target.value)}
                                        fullWidth
                                    />
                                ) : (
                                    <StyledTypographyLabel variant="subtext" className={styles.label}>{item.label}</StyledTypographyLabel>
                                )}
                                <StyledTextField
                                    value={item.value}
                                    onChange={(e) => {
                                      if (item.label === 'Website') {
                                        handleWebsiteChange(item.index!, e.target.value);
                                      } else if (section.title === 'Item Information') {
                                        handleStandardFieldChange(item.label.toLowerCase(), e.target.value);
                                      } else {
                                        handleCustomFieldChange(item.index!, 'value', e.target.value);
                                      }
                                    }}
                                    fullWidth
                                    type={item.secret && hiddenFields[item.label] ? 'password' : 'text'}
                                />
                              </div>
                              {item.secret && (
                                  <IconButton onClick={() => toggleVisibility(item.label)}>
                                    {hiddenFields[item.label] ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                  </IconButton>
                              )}
                            </div>
                          </StyledTableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {section.title === 'Websites' && (
                    <Button onClick={handleAddWebsite}>Add Website</Button>
                )}
                {section.title === 'Custom Fields' && (
                    <Button onClick={handleAddCustomField}>Add Custom Field</Button>
                )}
              </Paper>
          ))}
          <FormControlLabel
              control={<Checkbox checked={isFavourite} onChange={(e) => setIsFavourite(e.target.checked)} />}
              label="Favourite"
          />
        </Box>
    );
  }

  return null;
});
