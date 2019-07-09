import { useRef, useEffect, MutableRefObject } from "react";

const defaultOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: 0
}

/**
 * Creates intersection observer on provided element reference.
 * @param callback - function that is invoked on intersection.
 * @param options - `IntersectionObserver` options.
 * @example
 * const ref = useIntersectionObserver(([entry]) => {
 *   // Callback that is invoked on intersection.
 * });
 * 
 * return <div ref={ref}></div>;
 */
export function useIntersectionObserver<T extends HTMLElement>(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = defaultOptions
): MutableRefObject<T> {
  const ref = useRef<T>(null);
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    observer.current = new IntersectionObserver(callback, options);

    if (ref.current !== null) {
      observer.current.observe(ref.current);
    }

    return () => {
      observer.current.disconnect();
    }
  }, []);

  return ref;
}