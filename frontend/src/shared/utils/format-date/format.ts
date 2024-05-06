// eslint-disable-next-line import/no-duplicates
import { addMinutes, format, isValid } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import ruLocale from 'date-fns/locale/ru';
import { get } from 'lodash';
import { timeZoneOffsets } from './timezones';
import { currentTimezoneOffset } from './current-timezone-offset';

export const formatDateString = (
  date: string,
  dateFormat: string = 'd MMMM yyyy года в HH:mm',
  timezone: string = '',
): string => {
  let d = new Date(date);
  if (timezone && timezone !== 'local') {
    d = addMinutes(d, currentTimezoneOffset + get(timeZoneOffsets, timezone, 0));
  }

  return isValid(d)
    ? format(d, dateFormat, {
        locale: ruLocale,
      })
    : date;
};

export const formatDate = (date: Date, dateFormat: string = 'd MMMM yyyy года в HH:mm'): string =>
  format(date, dateFormat, {
    locale: ruLocale,
  });
