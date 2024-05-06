import { Timeline as MTimeline, TimelineProps, timelineOppositeContentClasses, timelineContentClasses } from '@mui/lab';
import { ReactNode, memo, useMemo } from 'react';

type Props = TimelineProps & {
  /**
   * Позиционирование компонента timeline.
   * - `'left'`: Компонент timeline будет выровнен по левому краю.
   * - `'center'`: Компонент timeline будет выровнен по центру.
   * - `'right'`: Компонент timeline будет выровнен по правому краю.
   */
  variant: 'left' | 'center' | 'right';
  children: ReactNode;
};

export const Timeline = memo(({ variant = 'center', children }: Props) => {
  const sxHandler = useMemo(() => {
    if (variant === 'left') {
      return {
        [`& .${timelineOppositeContentClasses.root}`]: { flexGrow: 0 },
        margin: 0,
        padding: 0,
      };
    }
    if (variant === 'right') {
      return {
        [`& .${timelineContentClasses.root}`]: { flexGrow: 0 },
        margin: 0,
        padding: 0,
      };
    }
    if (variant === 'center') {
      return {
        margin: 0,
        padding: 0,
      };
    }
    return {};
  }, [variant]);

  return <MTimeline sx={sxHandler}>{children}</MTimeline>;
});
