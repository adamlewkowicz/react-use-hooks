import { createContext, useState, useMemo, ReactNode, useCallback } from "react";

interface LSObject {
  [key: string]: string | number | boolean | null | undefined
}

type LSContext<S extends LSObject> = [S, (nextData: LSObject) => void];

export const LocalStorageContext = createContext<LSContext<LSObject>>([
  {},
  () => {}
]);


interface LocalStorageProviderProps {
  children: ReactNode
}
export function LocalStorageProvider({
  children
}: LocalStorageProviderProps) {
  const [data, setData] = useState<LSObject>(() => ({ ...localStorage }));
  
  const handleDataUpdate = useCallback((nextData: LSObject) => {
    setData(data => ({ ...data, ...nextData }));

    for (const key in nextData) {
      localStorage.setItem(key, JSON.stringify(nextData[key]));
    }
  }, [setData]);

  const value = useMemo((): LSContext<LSObject> => [data, handleDataUpdate], [data, handleDataUpdate]);

  return (
    <LocalStorageContext.Provider value={value}>
      {children}
    </LocalStorageContext.Provider>
  );
}


function useMemoizedState<S>(stateData: S) {
  const [state, setState] = useState<S>(stateData);
  return useMemo(() => [state, setState], [state, setState]);
}