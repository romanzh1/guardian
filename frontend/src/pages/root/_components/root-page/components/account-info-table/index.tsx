import { memo, useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, Typography, IconButton, Paper, styled } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LinkIcon from '@mui/icons-material/Link';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { queries } from 'src/api';
import { useValidRouteParams } from 'src/libs';
import styles from './index.module.scss';

const StyledTypographyLabel = styled(Typography)`
    font-size: 14px;
    color: #888;
`;

const StyledTableCell = styled(TableCell)`
    padding: 7px 14px;
`;

export const UserInfoTable = memo(() => {
    const { id } = useValidRouteParams('root');
    const { data } = queries.guardian.useGetAccount({ id });
    const [hiddenFields, setHiddenFields] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        if (data) {
            const initialHiddenFields: { [key: string]: boolean } = {};
            data.websites?.forEach(website => {
                initialHiddenFields[website] = false;
            });
            data.custom_fields?.forEach(field => {
                initialHiddenFields[field.key] = field.secret;
            });
            initialHiddenFields['Password'] = true;
            setHiddenFields(initialHiddenFields);
        }
    }, [data]);

    const toggleVisibility = (field: string) => {
        setHiddenFields(prev => ({ ...prev, [field]: !prev[field] }));
    };

    if (data)
        return (
            <Box className={styles.root}>
                {[
                    {
                        title: 'Item Information', fields: [
                            { label: 'Name', value: data.name, secret: false },
                            { label: 'Username', value: data.user_name, secret: false },
                            { label: 'Password', value: data.password, secret: true }
                        ]
                    },
                    { title: 'Websites', fields: data.websites?.map(website => ({ label: 'Website', value: website, secret: false })) || [] },
                    { title: 'Custom Fields', fields: data.custom_fields?.map(field => ({ label: field.key, value: field.value, secret: field.secret })) || [] },
                    {
                        title: 'Note', fields: [
                            { label: '', value: data.note, secret: false },
                        ]
                    },
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
                                                    <Typography >{hiddenFields[item.label] ? '•••••••' : item.value}</Typography>
                                                </div>
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
                                            </div>
                                        </StyledTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                ))}
                <div className={styles.dates}>
                    <Typography variant="tinytext" className={styles.date}><strong>Updated:</strong> {new Date(data.updated_at).toLocaleString()}</Typography>
                    <Typography variant="tinytext" className={styles.date}><strong>Created:</strong> {new Date(data.created_at).toLocaleString()}</Typography>
                </div>
            </Box>
        );
    return null;
});
