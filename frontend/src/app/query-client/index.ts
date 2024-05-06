import { QueryClient } from '@tanstack/react-query';
import { DefaultDependencies } from 'router5/dist/types/router';
import { Router } from 'router5';
import { RequestError, error } from 'src/libs';

export const getQueryClient = (router: Router<DefaultDependencies>) => {
  const handler = (err: unknown) => {
    if (err instanceof RequestError) {
      // TODO: корректно обрабатывать ошибки
      if (err.detail.status !== 401) {
        error(`${err.detail.status}: ${err.detail.errorText}`);
      } else {
        router.validNavigate('login');
      }
    }
  };

  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 10 * 1000,
        // onError: handler,
      },
      mutations: { onError: handler },
    },
  });
};
