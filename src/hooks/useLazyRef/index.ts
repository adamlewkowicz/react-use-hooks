import { useRef, MutableRefObject } from 'react';

/**
 * Creates lazily instantiated, React's mutable ref object.
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