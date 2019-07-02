import { useRef, useEffect } from 'react';

export function usePrevState<S>(state: S, callback?: (prevState: S) => void): S {
  const prevState = useRef<S>(state);

  useEffect(() => {
    prevState.current = state;
    if (callback) {
      callback(prevState.current);
    }
  }, [state]);

  return prevState.current;
}