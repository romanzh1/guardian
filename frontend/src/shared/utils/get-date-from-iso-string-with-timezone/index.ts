export const getDateFromIsoStringWithTimezone = (date: string): Date =>
  new Date(new Date(date).getTime() + new Date().getTimezoneOffset() * 60000);
