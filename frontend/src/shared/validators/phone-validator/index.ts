export const phoneValidator = (value: string = '') => {
  const clear = value.replace(/[^0-9]/g, '');
  return clear.length === 11 || clear.length === 12 ? '' : 'Неверный формат';
};
