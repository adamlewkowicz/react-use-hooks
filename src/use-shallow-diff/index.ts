import { useRef, useEffect } from 'react';

export function useShallowDiff<S>(state: S): boolean {
  const prevState = useRef(state);
  const hasChanged = useRef(false);

  useEffect(() => {
    prevState.current = state;

    const diffs = Object
      .entries(state)
      .filter(([prop, value]) => value !== prevState.current[prop]);

    hasChanged.current = diffs.length > 0;
  });

  return hasChanged.current;
}