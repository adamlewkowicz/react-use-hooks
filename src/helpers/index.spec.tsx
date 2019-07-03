import React from 'react';
import { HookProvider } from './HookProvider';
import { useLocalStorage } from '../use-local-storage';

interface LSContext {
  darkMode: boolean
  lang: string
  token: string | null
  rememberMe: boolean
}

const initialData: LSContext = {
  darkMode: true,
  lang: 'en',
  token: null,
  rememberMe: true
}

export const LSContext = React.createContext<LSContext>(initialData);

function Component() {
  return (
    <HookProvider
      hook={useLocalStorage}
      hookArgs={[initialData]}
      context={LSContext}
    >
      <div>Hello</div>
    </HookProvider>
  )
}