import { MutationFunction, QueryKey, useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';

type Options<TData, TVariables> = {
  keys: Array<QueryKey>;
  send: MutationFunction<TData, TVariables>;
};

export const buildMutationWithInvalidation =
  <TData, TError, TVariables>(opt: Options<TData, TVariables>) =>
  (options?: UseMutationOptions<TData, TError, TVariables>) => {
    const queryClient = useQueryClient();

    return useMutation<TData, TError, TVariables>({
      mutationFn: opt.send,
      ...options,
      onSuccess: (...args) => {
        opt.keys.forEach(key => queryClient.invalidateQueries(key));
        if (options?.onSuccess) {
          options.onSuccess(...args);
        }
      },
    });
  };
