import { useState, Dispatch, SetStateAction } from 'react';
import { usePrevState } from '../usePrevState';

/**
 * Returns loaded from Local Storage, stateful value, and function to update it.
 * Automatically updates data in Local Storage, based on state updates.
 * @param initialData - initial data that is merged with Local Storage data on initialization.
 * @example
 * const defaultData = { darkTheme: false };
 * const [storage, setStorage] = useLocalStorage(defaultData);
 */
export function useLocalStorage<T>(
  initialData?: T
): [T, Dispatch<SetStateAction<T>>] {
  const [data, setData] = useState<T>(() => ({ ...initialData, ...localStorage }));
  const prevData = usePrevState(data);

  if (!Object.is(prevData, data)) {
    for (const key in prevData) {
      if (!Object.is(prevData[key], data[key])) {
        localStorage.setItem(key, JSON.stringify(data[key]));
      }
    }
  }

  return [data, setData];
}