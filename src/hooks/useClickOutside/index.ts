import { useRef, useEffect, useCallback } from "react";

/**
 * Calls callback, if clicked element was placed outside of the referenced element. 
 * @example
 * const ref = useClickOutside(() => {
 *  // Callback that is invoked on each click outside.
 * });
 * 
 * return <div ref={ref}></div>;
 */
export function useClickOutside<T extends HTMLElement>(
  callback: () => void
) {
  const ref = useRef<T>();
  
  const handleEvent = useCallback(
    (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        callback();
      }
  }, [callback]);

  useEffect(() => {
    document.addEventListener('click', handleEvent);
    return () => {
      document.removeEventListener('click', handleEvent);
    }
  }, [handleEvent]);

  return ref;
}