import { createContext, ReactNode, useMemo, Context } from "react";
import { useLocalStorage } from ".";


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

export interface LSObject {
  [key: string]: string | number | boolean | null | undefined
}

export type LSContext<T extends LSObject> = [T, (nextData: T) => void];