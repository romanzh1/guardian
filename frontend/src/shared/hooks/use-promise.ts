import { useCallback, useState } from 'react';

type Fn = (...args: Array<any>) => any;

type UsePromiseResult<T extends Fn> = T extends (...args: infer Args) => infer Result
  ? {
      isLoading: boolean;
      wrappedFn: (...args: Args) => Result;
    }
  : never;

export const usePromise = <T extends Fn>(fn: T): UsePromiseResult<T> => {
  const [isLoading, setIsLoading] = useState(false);

  const wrappedFunction = useCallback(
    (...args: any) => {
      const result = fn(...args);
      if (result instanceof Promise) {
        setIsLoading(true);
        result.finally(() => {
          setIsLoading(false);
        });
      }
      return result;
    },
    [fn],
  );

  return { isLoading, wrappedFn: wrappedFunction } as UsePromiseResult<T>;
};
