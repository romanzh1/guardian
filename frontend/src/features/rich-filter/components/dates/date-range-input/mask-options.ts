import { parse } from 'date-fns';
import { IMask } from 'react-imask';
import { formatDate } from 'src/shared/utils';

const dateFormat = 'dd.MM.yyyy';
const FULL_DAY_IN_MS = 86399999;
const block = {
  mask: Date,
  pattern: dateFormat,
  min: new Date(1970, 0, 1),
  max: new Date(2030, 0, 1),
  parse: (s: string) => parse(s, dateFormat, new Date()),
  format: (d: Date) => formatDate(d, dateFormat),
  blocks: {
    yyyy: {
      mask: IMask.MaskedRange,
      from: 1970,
      to: 2030,
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    dd: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 31,
    },
  },
};

export const maskOptions = {
  mask: 'from - to',
  lazy: false,
  dateFormat,
  parse: (s: string) => {
    const [from, to] = s.split(' - ');

    const fromDate = parse(from, dateFormat, new Date());
    const toDate = parse(to, dateFormat, new Date());
    const difDate = toDate.getTime() - fromDate.getTime();

    return [fromDate, difDate ? toDate : new Date(toDate.getTime() + FULL_DAY_IN_MS)];
  },
  blocks: {
    from: block,
    to: block,
  },
};
