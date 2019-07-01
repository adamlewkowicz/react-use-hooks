import { createContext, useState, useMemo, ReactNode, Dispatch, SetStateAction } from "react";

interface LSObject {
  [key: string]: string | number | boolean | null | undefined
}

type LSContext<S extends LSObject> = [S, Dispatch<SetStateAction<S>>];

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
  
  function handleDataUpdate(nextData: LSObject) {
    setData(data => ({ ...data, ...nextData }));

    for (const key in nextData) {
      localStorage.setItem(key, JSON.stringify(nextData[key]));
    }
  }

  const value = useMemo((): LSContext<LSObject> => [data, setData], [data, setData]);

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