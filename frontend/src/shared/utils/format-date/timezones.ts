import { getTimezoneOffset } from 'src/shared/utils/format-date/get-timezone-offset';

export const timezones = [
  { label: 'Локальное время', value: 'local' },
  { label: 'GMT+3 / Москва', value: 'Europe/Moscow' },
  { label: 'GMT+2 / Калининград', value: 'Europe/Kaliningrad' },
  { label: 'GMT+4 / Самара', value: 'Europe/Samara' },
  { label: 'GMT+5 / Екатеринбург', value: 'Asia/Yekaterinburg' },
  { label: 'GMT+6 / Омск', value: 'Asia/Omsk' },
  { label: 'GMT+7 / Красноярск', value: 'Asia/Krasnoyarsk' },
  { label: 'GMT+8 / Иркутск', value: 'Asia/Irkutsk' },
  { label: 'GMT+9 / Якутск', value: 'Asia/Yakutsk' },
  { label: 'GMT+10 / Владивосток', value: 'Asia/Vladivostok' },
  { label: 'GMT+11 / Магадан', value: 'Asia/Magadan' },
  { label: 'GMT+12 / Камчатка', value: 'Asia/Kamchatka' },
  { label: 'GMT+0 / Лондон', value: 'Europe/London' },
  { label: 'GMT+4 / Дубай', value: 'Asia/Dubai' },
  { label: 'GMT+6 / Алматы', value: 'Asia/Almaty' },
  { label: 'GMT+8 / Шанхай', value: 'Asia/Shanghai' },
] as const;

// { 'Europe/Moscow': 180 }
export const timeZoneOffsets = timezones.reduce<Record<string, number>>((acc, item) => {
  acc[item.value] = item.value === 'local' ? 0 : getTimezoneOffset(item.value);

  return acc;
}, {});

// { 'Europe/Moscow': 'GMT+3 / Москва' }
export const timeZoneNames = timezones.reduce<Record<string, string>>((acc, item) => {
  acc[item.value] = item.label;

  return acc;
}, {});
