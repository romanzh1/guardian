export const getDateFromISOStringWithTimezone = (date: string): Date =>
  new Date(new Date(date).getTime() + new Date().getTimezoneOffset() * 60000);
