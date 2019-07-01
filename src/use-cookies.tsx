import { useState, useEffect, createContext, useMemo, ReactNode, useContext } from "react";

interface CookiesObject {
  [key: string]: string | number | boolean | null | undefined
}

function parseCookies<T>(): T {
  return document.cookie
    .split(';')
    .reduce((parsed, cookie) => {
      const [name, value] = cookie.split('=');
      return {
        ...parsed,
        [name]: value
      }
    }, {} as T);
}

function stringifyCookies(object: CookiesObject): string {
  return Object
    .entries(object)
    .map(([prop, value]) => `${prop}=${value}`)
    .join(';');
}

export function useCookies<T extends CookiesObject>() {
  const [cookies, setCookies] = useState<T>(() => parseCookies<T>());

  useEffect(() => {
    document.cookie = stringifyCookies(cookies);
  }, [cookies]);

  return [cookies, setCookies];
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

interface MyCookies {
  token?: string
  redTheme?: boolean
}
function Component() {
  const [cookies] = useContext(CookiesContext);
  
}