export const nullToString = (text: string | null | undefined) => {
  if (text === null || text === undefined) {
    return '';
  }
  return text;
};
