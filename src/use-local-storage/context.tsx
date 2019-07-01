import { createContext, ReactNode, useMemo, Context } from "react";
import { LSObject, useLocalStorage } from "./hook";


export function createLSContext<T extends LSObject>(initialState: T) {
  return createContext([initialState, () => {}]);
}

interface LocalStorageProviderProps<C> {
  children: ReactNode
  context: Context<C>
}
export function LocalStorageProvider<C extends LSObject>({
  children,
  context: LocalStorageContext
}: LocalStorageProviderProps<C>) {

  const [data, setData] = useLocalStorage<C>();
  const value = useMemo(() => [data, setData], [data, setData]);

  return (
    <LocalStorageContext.Provider value={value}>
      {children}
    </LocalStorageContext.Provider>
  );
}