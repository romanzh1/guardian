import { ReactNode, useCallback, useMemo, useState } from 'react';
import { useRoute } from 'react-router5';
import cn from 'classnames';
import { Typography } from '@mui/material';
import StarPurple500OutlinedIcon from '@mui/icons-material/StarPurple500Outlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AutoDeleteOutlinedIcon from '@mui/icons-material/AutoDeleteOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { queries } from 'src/api';
import styles from './index.module.scss';
import { ItemInfo } from './components';

type Item = {
  icon: ReactNode;
  label: ReactNode;
  path: string;
  visible: boolean;
};

export const AdminMainMenu = () => {
  const ITEMS = useMemo<Array<Item>>(
    () => [
      {
        icon: <StarPurple500OutlinedIcon />,
        label: 'All items',
        path: 'allItems',
        visible: true,
      },
      {
        icon: <CategoryOutlinedIcon />,
        label: 'Favorites',
        path: 'favorites',
        visible: true,
      },
      {
        icon: <AutoDeleteOutlinedIcon />,
        label: 'Trash',
        path: 'trash',
        visible: true,
      },
      {
        icon: <AssignmentIndOutlinedIcon />,
        label: 'Login',
        path: 'login',
        visible: true,
      },
      {
        icon: <CreditCardOutlinedIcon />,
        label: 'Card',
        path: 'card',
        visible: true,
      },
      {
        icon: <BadgeOutlinedIcon />,
        label: 'Identity',
        path: 'identity',
        visible: true,
      },
      {
        icon: <DescriptionOutlinedIcon />,
        label: 'Secure note',
        path: 'secureNote',
        visible: true,
      },
    ],
    [],
  );
  const { route } = useRoute();

  const [state, setState] = useState<string>('allItems');
  const handleChangePath = useCallback((newData: string) => {
    setState(newData);
  }, []);
  console.log(state);

  const { data } = queries.guardian.useGetAllAccounts();

  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <div className={styles.navigation}>
          {ITEMS.map(item => (
            <Typography
              key={item.path}
              className={cn(styles.item, { [styles.item_active]: state.toLowerCase() === item.path.toLowerCase() })}
              component="a"
              onClick={() => handleChangePath(item.path)}
            >
              <div className={styles.iconWrapper}>{item.icon}</div>
              <div className={styles.title}>{item.label}</div>
            </Typography>
          ))}
        </div>
        <div className={styles.elements}>
          {data &&
            data.map(item => (
              <ItemInfo key={item.id} account={item.user_name} id={item.id} img={item.icon_link} name={item.name} />
            ))}
        </div>
      </div>
    </div>
  );
};
