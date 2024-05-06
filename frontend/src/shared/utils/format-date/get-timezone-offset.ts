export const getTimezoneOffset = (timeZone = 'GMT', date = new Date()) => {
  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'GMT' }));
  const tzDate = new Date(date.toLocaleString('en-US', { timeZone }));
  return (tzDate.getTime() - utcDate.getTime()) / 60000;
};
