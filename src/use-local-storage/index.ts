import { useState, useEffect, Dispatch, SetStateAction } from 'react';


export function useLocalStorage<T>(
  initialData?: T
): [T, Dispatch<SetStateAction<T>>] {
  const [data, setData] = useState<T>(() => ({ ...initialData, ...localStorage }));
  
  useEffect(() => {
    for (const key in data) {
      localStorage.setItem(key, JSON.stringify(data[key]));
    }
  }, [data]);

  return [data, setData];
}