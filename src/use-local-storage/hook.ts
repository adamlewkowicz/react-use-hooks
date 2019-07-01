import { useCallback, useState } from 'react';


export function useLocalStorage<T extends LSObject>(): [T, (nextData: T) => void] {
  const [data, setData] = useState<T>(() => ({ ...localStorage } as any));
  
  const handleDataUpdate = useCallback((nextData: T) => {
    setData(data => ({ ...data, ...nextData }));

    for (const key in nextData) {
      localStorage.setItem(key, JSON.stringify(nextData[key]));
    }
  }, [setData]);

  return [data, handleDataUpdate];
}


export interface LSObject {
  [key: string]: string | number | boolean | null | undefined
}

export type LSContext<T extends LSObject> = [T, (nextData: T) => void];