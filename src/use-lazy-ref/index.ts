import { useRef, MutableRefObject } from 'react';

export function useLazyRef<T>(
  initialValue: () => T
): MutableRefObject<T> {
  const ref = useRef<T>(null);

  if (ref === null) {
    ref.current = initialValue();
  }

  return ref;
}