import React, { memo, useEffect, useRef } from 'react';
import { TabProps } from '@mui/material';
import { Tab } from 'src/shared/components';

type Props = TabProps & {
  onChangeVisibility?: (value: string, isVisible: boolean) => void;
};

export const ObservableTab = memo(({ onChangeVisibility, value, ...restProps }: Props) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        const [entry] = entries;
        if (onChangeVisibility) onChangeVisibility(value, entry.isIntersecting);
      },
      { root: null, rootMargin: '0px', threshold: 0.8 },
    );
    if (ref.current) observer.observe(ref.current);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (ref.current) observer.disconnect();
    };
  }, [value, onChangeVisibility]);

  return (
    <Tab
      ref={ref}
      value={value}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    />
  );
});
