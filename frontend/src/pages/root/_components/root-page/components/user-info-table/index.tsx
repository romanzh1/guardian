import { memo } from 'react';
import { Box, Table, TableBody, TableCell, Typography } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import { queries } from 'src/api';
import { useValidRouteParams } from 'src/libs';
import styles from './index.module.scss';

export const UserInfoTable = memo(() => {
  const { id } = useValidRouteParams('root');
  const { data } = queries.guardian.useGetAllAccountsById({ id });
  if (data)
    return (
      <Box className={styles.root}>
        <Table>
          <TableBody>
            <TableRow className={styles.row} sx={{ display: 'grid' }}>
              <TableCell>
                <Typography>Name</Typography>
              </TableCell>
              <TableCell>
                <Typography>{data.name}</Typography>
              </TableCell>
            </TableRow>
            <TableRow className={styles.row} sx={{ display: 'grid' }}>
              <TableCell>
                <Typography>User name</Typography>
              </TableCell>
              <TableCell>
                <Typography>{data.user_name}</Typography>
              </TableCell>
            </TableRow>
            <TableRow className={styles.row} sx={{ display: 'grid' }}>
              <TableCell>
                <Typography>Email</Typography>
              </TableCell>
              <TableCell>
                <Typography>{data.email}</Typography>
              </TableCell>
            </TableRow>
            <TableRow className={styles.row} sx={{ display: 'grid' }}>
              <TableCell>
                <Typography>Password</Typography>
              </TableCell>
              <TableCell>
                <Typography>{data.password}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    );
  return null;
});
