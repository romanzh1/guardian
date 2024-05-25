import { memo, useState } from 'react';
import { Box, Table, TableBody, TableCell, Typography, IconButton, Paper, styled, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import { queries } from 'src/api';
import { useValidRouteParams } from 'src/libs';
import styles from './index.module.scss';
import VisibilityIcon from '@mui/icons-material/Visibility';

const StyledTypographyLabel = styled(Typography)`
    font-size: 14px;
    color: #888;
`;

const StyledTableCell = styled(TableCell)`
    padding: 7px 14px;
`;

export const UserInfoEdit = memo(() => {
  const { id } = useValidRouteParams('root');
  const { data } = queries.guardian.useGetAccount({ id });
  const [websites, setWebsites] = useState(data?.websites || []);
  const [customFields, setCustomFields] = useState(data?.custom_fields || []);
  const [isFavourite, setIsFavourite] = useState(false);

  const handleAddWebsite = () => {
    setWebsites([...websites, '']);
  };

  const handleAddCustomField = () => {
    // @ts-ignore
    setCustomFields([...customFields, { key: '', value: '' }]);
  };

  const handleWebsiteChange = (index: number, value: string) => {
    const newWebsites = [...websites];
    newWebsites[index] = value;
    setWebsites(newWebsites);
  };

  const handleCustomFieldChange = (index: number, key: string, value: string) => {
    const newCustomFields = [...customFields];
    // @ts-ignore
    newCustomFields[index][key] = value;
    setCustomFields(newCustomFields);
  };

  const toggleVisibility = (field: string) => {
    // @ts-ignore
    setHiddenFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

  if (data)
    { 
      
      return (
              <Box className={styles.root}>
                {[
                  { title: 'Item Information', fields: [
                      { label: 'Name', value: data.name, secret: false },
                      { label: 'Username', value: data.user_name, secret: false },
                      { label: 'Password', value: data.password, secret: true }
                    ]},
                  { title: 'Websites', fields: websites.map(website => ({ label: 'Website', value: website, secret: false })) },
                  { title: 'Custom Fields', fields: customFields.map(field => ({ label: field.key, value: field.value, secret: false })) }
                ].map((section, index) => (
                    <Paper elevation={3} className={styles.block} key={index}>
                      <Typography variant="h4" className={styles.header}>{section.title}</Typography>
                      <Table>
                        <TableBody>
                          {section.fields && section.fields.map((item, idx) => (
                              <TableRow key={idx} className={styles.row}>
                                <StyledTableCell colSpan={2} className={styles.fullWidthCell}>
                                  <div className={styles.value}>
                                    <div>
                                      <StyledTypographyLabel variant="subtext" className={styles.label}>{item.label}</StyledTypographyLabel>
                                      <TextField
                                          value={item.value}
                                          onChange={(e) => {
                                            if (item.label === 'Website') {
                                              handleWebsiteChange(idx, e.target.value);
                                            } else {
                                              handleCustomFieldChange(idx, item.label, e.target.value);
                                            }
                                          }}
                                          fullWidth
                                      />
                                    </div>
                                    {item.secret && (
                                        <IconButton onClick={() => toggleVisibility(item.label)}>
                                           <VisibilityIcon />
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
                <div className={styles.dates}>
                  <Typography variant="tinytext" className={styles.date}><strong>Updated:</strong> {new Date(data.updated_at).toLocaleString()}</Typography>
                  <Typography variant="tinytext" className={styles.date}><strong>Created:</strong> {new Date(data.created_at).toLocaleString()}</Typography>
                </div>
              </Box>
          );
    }
  return null;
});
