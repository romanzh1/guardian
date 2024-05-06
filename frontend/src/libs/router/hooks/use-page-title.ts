import { useRoute } from 'react-router5';

export const usePageTitle = (title: string) => {
  const { router } = useRoute();

  const { postfixTitle } = router.getDependencies();
  let fullTitle = title;
  if (postfixTitle) {
    fullTitle += ` / ${postfixTitle}`;
  }

  document.title = fullTitle;
};
