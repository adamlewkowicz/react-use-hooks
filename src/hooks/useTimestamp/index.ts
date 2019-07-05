import { useState, useEffect } from "react";

/**
 * Returns current timestamp (in seconds) that is being incremented on each second.
 * @example
 * const timestamp = useTimestamp();
 */
export function useTimestamp(): number {
  const [timestamp, setTimestamp] = useState(() => Math.floor(Date.now()/ 1000));

  useEffect(() => {
    const interval = setInterval(() => 
      setTimestamp(prev => prev + 1),
      1000
    );
    return () => clearInterval(interval);
  }, []);

  return timestamp;
}