import { useState, useEffect, Dispatch, SetStateAction } from "react";

/**
 * Returns an array (useState) of object with parsed cookies and function for updating.
 */
export function useCookies<T>(): [T, Dispatch<SetStateAction<T>>] {
  const [cookies, setCookies] = useState<T>(() => parseCookies<T>(document.cookie));

  useEffect(() => {
    document.cookie = stringifyCookies(cookies);
  }, [cookies]);

  return [cookies, setCookies];
}


function parseCookies<T>(cookiesString: string): T {
  return cookiesString
    .split(';')
    .reduce((parsed, cookie) => {
      const [name, value] = cookie.split('=');
      return {
        ...parsed,
        [name]: value
      }
    }, {} as T);
}

function stringifyCookies<T>(cookiesData: T): string {
  return Object
    .entries(cookiesData)
    .map(([prop, value]) => `${prop}=${value}`)
    .join(';');
}