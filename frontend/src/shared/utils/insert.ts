import { cloneDeep } from 'lodash';

export const insert = <T>(arr: Array<T>, from: number, to: number): Array<T> => {
  const swapped = cloneDeep(arr);
  const item1 = swapped[from];

  swapped.splice(from, 1);
  swapped.splice(to, 0, item1);

  return swapped;
};
