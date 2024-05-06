export const fakeRequest = (...values: any) => {
  // eslint-disable-next-line no-console
  console.log(...values);

  return new Promise<void>(resolve => {
    setTimeout(() => resolve(), 1000);
  });
};
