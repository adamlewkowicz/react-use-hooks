import { useRef, MutableRefObject } from 'react';

/**
 * Creates lazily instantiated, React's mutable ref object.
 * Useful when you want to create persisted value between re-renders, eg. creating instances.
 * @param initialValue - function that returns initial value. This function is invoked only, if ref's value is `null`.
 * @example
 * const ref = useLazyRef(() => new AbortController());
 * const controller = ref.current;
 */
export function useLazyRef<T>(
  initialValue: () => T
): MutableRefObject<T> {
  const ref = useRef<T>(null);

  if (ref.current === null) {
    ref.current = initialValue();
  }

  return ref;
}