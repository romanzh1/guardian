export const nameForm = (name: string, version: number, title?: string) => {
  if (title) {
    return `${title}/${name}-V-${version}`;
  }
  return `${name}-V-${version}`;
};
