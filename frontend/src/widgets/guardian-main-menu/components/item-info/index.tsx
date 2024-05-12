import { memo, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'react-router5';
import styles from './index.module.scss';

type Props = {
  id: string;
  account: string;
  name: string;
  img: string;
};

export const ItemInfo = memo(({ name, img, account, id }: Props) => {
  const router = useRouter();

  const handleItemClick = useCallback(() => {
    router.validNavigate('root', { id });
  }, [id, router]);

  return (
    <Box className={styles.root} onClick={handleItemClick}>
      <img alt="alt" className={styles.img} src={img} />
      <Box className={styles.info}>
        <Typography sx={{ fontWeight: 600 }} variant="text">
          {name}
        </Typography>
        <Typography variant="text">{account}</Typography>
      </Box>
    </Box>
  );
});
