import { subMinutes } from 'date-fns';
import { get } from 'lodash';
import { timeZoneOffsets } from './timezones';
import { currentTimezoneOffset } from './current-timezone-offset';

export const getISOStringWithTimezone = (date: Date, timezone: string): string => {
  if (timezone === 'local') return date.toISOString();
  return subMinutes(date, currentTimezoneOffset + get(timeZoneOffsets, timezone, 0)).toISOString();
};
