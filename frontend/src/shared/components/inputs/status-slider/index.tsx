import React, { memo } from 'react';
import cn from 'classnames';
import { Box, Typography } from '@mui/material';
import { FULL_BOUNDARY, MIDDLE_BOUNDARY } from 'src/constants/percent-boundanary';
import styles from './index.module.scss';

type Props = {
  total?: number;
  value?: number;
  percent?: number;
  isPercent?: boolean;
  measurement?: string;
  isConsumptionTable?: boolean;
  isConsumptionCategory?: boolean;
};

export const StatusSlider = memo(
  ({
    total,
    value,
    percent,
    isPercent = false,
    measurement,
    isConsumptionTable = false,
    isConsumptionCategory = false,
  }: Props) => {
    const percentUse = value && total ? value / total : 0;
    const titleInfo = Math.round(+percentUse.toFixed(2) * 100);

    if (isConsumptionCategory) {
      const categoryPercent = total && value && total > value ? value / total : 1;
      const infoPercent = Math.round(+categoryPercent.toFixed(2) * 100);
      return (
        <Box>
          <div className={styles.ConsumptionTable}>
            <input
              className={cn(styles.slider, {
                [styles.sliderFull]: categoryPercent >= FULL_BOUNDARY,
                [styles.sliderMiddle]: categoryPercent <= FULL_BOUNDARY && categoryPercent >= MIDDLE_BOUNDARY,
                [styles.slider_empty]: categoryPercent === 0,
              })}
              disabled
              max={100}
              min={0}
              title={`${infoPercent}%`}
              type="range"
              value={infoPercent}
            />
            <Typography sx={{ whiteSpace: 'nowrap' }} variant="text">{`${infoPercent}%`}</Typography>
          </div>
        </Box>
      );
    }

    if (isConsumptionTable && percent) {
      const consumptionPercent = Math.round(percent * 100);

      return (
        <Box className={styles.root}>
          <div className={styles.ConsumptionTable}>
            <input
              className={cn(styles.slider, {
                [styles.sliderFull]: percent >= FULL_BOUNDARY,
                [styles.sliderMiddle]: percent <= FULL_BOUNDARY && percent >= MIDDLE_BOUNDARY,
                [styles.slider_empty]: percent === 0,
              })}
              disabled
              max={100}
              min={0}
              title={`${consumptionPercent}%`}
              type="range"
              value={consumptionPercent}
            />
            <Typography sx={{ whiteSpace: 'nowrap' }} variant="text">{`${consumptionPercent}%`}</Typography>
          </div>
        </Box>
      );
    }

    return (
      <Box className={styles.root}>
        {isPercent && <Typography variant="text">{`${titleInfo}%`}</Typography>}
        <input
          className={cn(styles.slider, {
            [styles.sliderFull]: percentUse >= FULL_BOUNDARY,
            [styles.sliderMiddle]: percentUse <= FULL_BOUNDARY && percentUse >= MIDDLE_BOUNDARY,
            [styles.slider_empty]: value === 0,
          })}
          disabled
          max={total}
          min={0}
          title={`${titleInfo}%`}
          type="range"
          value={value}
        />
        {isPercent && measurement && (
          <div className={styles.info}>
            <Typography
              className={cn(styles.text, {
                [styles.textMiddle]: percentUse <= FULL_BOUNDARY && percentUse >= MIDDLE_BOUNDARY,
                [styles.textFull]: percentUse >= FULL_BOUNDARY,
              })}
              variant="text"
            >{`${value} ${measurement}`}</Typography>
            <Typography variant="text">{`/ ${total} ${measurement}`}</Typography>
          </div>
        )}
      </Box>
    );
  },
);
