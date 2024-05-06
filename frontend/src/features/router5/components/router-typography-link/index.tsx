import { TypographyProps } from '@mui/material';
import React, { useMemo } from 'react';
import { useRouter } from 'react-router5';
import { useLinkOnClick } from 'src/shared/hooks';
import { TypographyLink } from 'src/shared/components';
import { GetOptionalParamsByRouteName, RouteNodeList } from 'src/libs/router';

type PropsType<T extends RouteNodeList> = {
  path: T;
  routeParams: GetOptionalParamsByRouteName<T>;
} & TypographyProps<'a'>;

// не заворачивать в memo иначе не пробрасываются типы
export const RouterTypographyLink = <T extends RouteNodeList>({
  path,
  routeParams,
  variant = 'text',
  color,
  sx,
  className,
  ...rest
}: PropsType<T>) => {
  const router = useRouter();
  const href = useMemo(() => router.buildValidPath(path, routeParams), [path, routeParams, router]);

  const handleClick = useLinkOnClick(() => {
    router.validNavigate(path, routeParams);
  }, [path, routeParams, router]);

  return (
    <TypographyLink
      className={className}
      href={href}
      onClick={handleClick}
      sx={{ color, ...sx }}
      variant={variant}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  );
};
