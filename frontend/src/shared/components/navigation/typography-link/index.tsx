import { Typography, TypographyProps } from '@mui/material';
import classnames from 'classnames';
import cn from './index.module.scss';

type Props = TypographyProps<'a'>;

// не заворачивать в memo иначе не пробрасываются типы
export const TypographyLink = ({ variant = 'text', color, sx, className, ...rest }: Props) => {
  return (
    <Typography
      className={classnames(cn.root, className)}
      component="a"
      sx={{ color, ...sx }}
      variant={variant}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  );
};
