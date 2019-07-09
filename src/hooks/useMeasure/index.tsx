import { useRef, MutableRefObject, useLayoutEffect } from "react";
import { ResizeObserver } from "../../ResizeObserver";


export function useMeasure<T extends HTMLElement>(): UseMeasureResult<T> {
  const ref = useRef<T>(null);
  const observer = useRef<ResizeObserver>();
  const measure = useRef<DOMRectReadOnly | {}>({});

  useLayoutEffect(() => {
    observer.current = new ResizeObserver(([entry]) => {
      measure.current = entry.contentRect;
    });
    
    if (ref.current !== null) {
      observer.current.observe(ref.current);
    }

    return () => observer.current.disconnect();
  }, []);

  return { ref, rect: measure.current };
}

interface UseMeasureResult<T> {
  ref: MutableRefObject<T>
  rect: DOMRectReadOnly | {}
}