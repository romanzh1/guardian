import { memo, useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, Typography, IconButton, Paper, styled } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
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

export const SecureNoteTable = memo(() => {
    const { id } = useValidRouteParams('root');
    const { data } = queries.guardian.useGetSecureNote({ id });

    if (data)
        return (
            <Box className={styles.root}>
                {[
                    {
                        title: 'Item Information', fields: [
                            { label: 'Name', value: data.name},
                        ]
                    },
                    {
                        title: 'Note', fields: [
                            { label: '', value: data.text},
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
                                                    <Typography >{item.value}</Typography>
                                                </div>
                                                <div className={styles.icons}>
                                                    <IconButton onClick={() => navigator.clipboard.writeText(item.value)}>
                                                        <ContentCopyIcon />
                                                    </IconButton>
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
