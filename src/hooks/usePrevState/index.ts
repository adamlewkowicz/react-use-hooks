import { useRef, useEffect } from 'react';

/**
 * Returns mutable value with previous state.
 * @param state - state data.
 * @param callback - function invoked after state changes.
 * @example
 * const [counter, setCounter] = useState(1);
 * const prevCounter = usePrevState(counter);
 */
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