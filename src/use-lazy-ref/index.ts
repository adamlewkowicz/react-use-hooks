import { useRef, MutableRefObject } from 'react';

export function useLazyRef<T>(
  initialValue: () => T
): MutableRefObject<T> {
  const ref = useRef<T>(null);

  if (ref.current === null) {
    ref.current = initialValue();
  }

  return ref;
}