import { useRoute } from 'react-router5';

export const useRouteId = (): string => {
  const {
    route: {
      params: { id },
    },
  } = useRoute();
  return id;
};
