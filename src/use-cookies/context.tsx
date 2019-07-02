import { ReactNode, useMemo, createContext } from "react";
import { useCookies } from "./";

interface CookiesObject {
  [key: string]: string | number | boolean | null | undefined
}

export const CookiesContext = createContext<[CookiesObject, () => {}]>(null);

interface CookiesProviderProps {
  children: ReactNode
}
export function CookiesProvider({ children }: CookiesProviderProps) {
  const [cookies, setCookies] = useCookies();
  const value = useMemo(() => [cookies, setCookies], [cookies]);

  return (
    <CookiesContext.Provider value={value}>
      {children}
    </CookiesContext.Provider>
  );
}