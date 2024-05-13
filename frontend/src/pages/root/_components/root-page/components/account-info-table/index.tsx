import { memo, useState } from 'react';
import { Box, Table, TableBody, TableCell, Typography, IconButton, Paper } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LinkIcon from '@mui/icons-material/Link';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { queries } from 'src/api';
import { useValidRouteParams } from 'src/libs';
import styles from './index.module.scss';

export const UserInfoTable = memo(() => {
  const { id } = useValidRouteParams('root');
  const { data } = queries.guardian.useGetAllAccountsById({ id });
  const [hiddenFields, setHiddenFields] = useState<{ [key: string]: boolean }>({});

  const toggleVisibility = (field: string) => {
    setHiddenFields(prev => ({ ...prev, [field]: !prev[field] }));
  };

  if (data)
    return (
        <Box className={styles.root}>
          <Paper elevation={3} className={styles.block}>
            {[
              { title: 'Main Information', fields: [
                  { label: 'Name', value: data.name, secret: false },
                  { label: 'User name', value: data.user_name, secret: false },
                  { label: 'Email', value: data.email, secret: false },
                  { label: 'Password', value: data.password, secret: true }
                ]},
              { title: 'Websites', fields: data.websites?.map(website => ({ label: 'Website', value: website, secret: false })) || []},
              { title: 'Custom Fields', fields: data.custom_fields?.map(field => ({ label: field.key, value: field.value, secret: false })) || [] }
            ].map((section, index) => (
                <div key={index}>
                  <Typography variant="h4" className={styles.header}>{section.title}</Typography>
                  <Table>
                    <TableBody>
                      {section.fields && section.fields.map((item, idx) => (
                          <TableRow key={idx} className={styles.row}>
                            <TableCell colSpan={2} className={styles.fullWidthCell}>
                              <Typography variant="subtitle">{item.label}</Typography>
                              <Typography>{hiddenFields[item.label] ? '•••••••' : item.value}</Typography>
                              <div className={styles.icons}>
                                <IconButton onClick={() => navigator.clipboard.writeText(item.value)}>
                                  <ContentCopyIcon />
                                </IconButton>
                                {item.secret && (
                                    <IconButton onClick={() => toggleVisibility(item.label)}>
                                      {hiddenFields[item.label] ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                )}
                                {item.label === 'Website' && (
                                    <IconButton onClick={() => window.open(item.value, '_blank')}>
                                      <LinkIcon />
                                    </IconButton>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
            ))}
          </Paper>
        </Box>
    );
  return null;
});