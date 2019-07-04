import { useRef, useEffect, useCallback } from "react";


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