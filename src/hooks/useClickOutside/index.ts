import { useRef, useEffect, useCallback } from "react";

/**
 * Calls callback, if clicked element was placed outside of the referenced element.
 * Useful in creating modals, popups etc.
 * @param callback - function that is invoked after user has clicked outside of the specified element.
 * @example
 * const [opened, setOpened] = useState(true);
 * const ref = useClickOutside(() => setOpened(false));
 * 
 * return <div ref={ref}>{ ... }</div>;
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