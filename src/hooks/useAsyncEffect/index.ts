import { useEffect, DependencyList } from "react";

export function useAsyncEffect(
  asyncEffect: () => Promise<any>,
  cleanup?: () => void | (() => void) | undefined,
  dependencies?: DependencyList
) {
  useEffect(() => {
    asyncEffect();
    return cleanup;
  }, dependencies);
}