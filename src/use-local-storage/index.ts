import { createContext, useState } from "react";

interface LSObject {
  [key: string]: string | number | boolean | null | undefined
}

export const LocalStorageContext = createContext();

export function LocalStorageProvider() {
  const [data, setData] = useState(() => ({ ...localStorage }));
  
  function handleDataUpdate(nextData: LSObject) {
    setData(data => ({ ...data, ...nextData }));

    for (const key in nextData) {
      localStorage.setItem(key, JSON.stringify(nextData[key]));
    }
  }

  return [data, handleDataUpdate];
}