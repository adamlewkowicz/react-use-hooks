import { useState, useCallback } from "react";

export function useLocalStorage<T>(key: string) {
  const [data, setData] = useState<T | null>((): T | null => {
    const result = localStorage.getItem(key);
    if (result !== null) {
      return JSON.parse(result);
    }
    return result;
  });

  const handleDataUpdate = useCallback(
    (nextData: T) => {
      localStorage.setItem(key, JSON.stringify(nextData));
      setData(nextData);
    }, [key]
  );

  return [data, handleDataUpdate];
}

function Component() {
  const [token, setToken] = useLocalStorage<string>('token');
  setToken('my new token');
}