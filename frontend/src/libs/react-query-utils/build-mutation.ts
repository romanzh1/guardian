import { MutationKey, useMutation, UseMutationOptions, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { Data, Err, SendFn, Query, Variables } from './types';

type Options<T extends SendFn> = UseMutationOptions<Data<T>, Err<T>, Variables<T>> & {
  invalidQueries?: Array<Query>;
};

type BuildMutationResult<T extends SendFn> = (
  options?: Options<T>,
) => UseMutationResult<Data<T>, Err<T>, Variables<T>> & { mutationKey: MutationKey };

export const buildMutation = <Q extends Query, S extends Q['send']>(
  query: Q,
  defaultOptions?: Options<S>,
): BuildMutationResult<S> => {
  const { send, config } = query;
  type SendType = typeof send;

  const useExecuteMutation = (options?: Options<SendType>) => {
    const queryClient = useQueryClient();

    let mutationKey;
    if (typeof config === 'function') {
      const newConfig = config();
      mutationKey = [newConfig.id, newConfig.method, newConfig.url];
    } else {
      mutationKey = [config.id, config.method, config.url];
    }

    const handleOnSuccess = (data: any, variables: any, context: unknown) => {
      const invalidQueries: Array<Query> = options?.invalidQueries || defaultOptions?.invalidQueries || [];

      invalidQueries.forEach(item => {
        if (typeof item.config === 'function') {
          // eslint-disable-next-line no-console
          console.log('Инвалидация запросов не работает с функциональными конфигами');
        } else {
          const { method, url, id } = item.config;
          const invalidKey = [id, method, url];
          queryClient.invalidateQueries({ queryKey: invalidKey });
        }
      });

      const onSuccess = options?.onSuccess || defaultOptions?.onSuccess;

      if (onSuccess) onSuccess(data, variables, context);
    };

    const result = useMutation<Data<SendType>, Err<SendType>, Variables<SendType>>({
      mutationKey,
      mutationFn: send,
      ...defaultOptions,
      ...options,
      onSuccess: handleOnSuccess,
    });

    return { ...result, mutationKey };
  };

  return useExecuteMutation as any;
};
