import React, { PropsWithChildren, memo, useEffect, useRef, useState } from 'react';

type Props = {
  onChangeVisibility: (isVisible: boolean) => void;
};

export const Observable = memo(({ onChangeVisibility, children }: PropsWithChildren<Props>) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { root: null, rootMargin: '0px', threshold: 1 },
    );
    if (ref.current) observer.observe(ref.current);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      if (ref.current) observer.disconnect();
    };
  }, [onChangeVisibility]);

  useEffect(() => {
    onChangeVisibility(isVisible);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return <div ref={ref}>{children}</div>;
});
