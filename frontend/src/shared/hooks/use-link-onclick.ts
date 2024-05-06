import { DependencyList, useCallback } from 'react';
import { isModifierPressed } from 'src/shared/utils';

export function useLinkOnClick(action: Function, deps?: DependencyList) {
  return useCallback(
    (event: any, ...args: any) => {
      if (isModifierPressed(event)) {
        return;
      }
      event.preventDefault();
      action(event, ...args);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? [...deps] : [],
  );
}
