export const formatPhone = (phone: number | string): string => {
  if (!phone) {
    return '';
  }

  const p = phone.toString();

  if (p.length === 11) {
    return [
      '+',
      p[0],
      ' (',
      p.substring(1, 4),
      ') ',
      p.substring(4, 7),
      '-',
      p.substring(7, 9),
      '-',
      p.substring(9, 11),
    ].join('');
  }

  if (p.length === 12) {
    return [
      '+',
      p.substring(0, 3),
      '-',
      p.substring(3, 5),
      '-',
      p.substring(5, 8),
      '-',
      p.substring(8, 10),
      '-',
      p.substring(10, 12),
    ].join('');
  }

  return `+${p}`;
};
