import { ReactNode, useMemo, Context } from "react";

interface HookProviderProps<H> {
  children: ReactNode
  context: Context<any>
  hook: H
  hookArgs?: any[]
}
export function HookProvider<H extends Function>({
  children,
  context: Context,
  hook: useHook,
  hookArgs
}: HookProviderProps<H>) {
  const hookData = useHook(...hookArgs);
  const memoizedHookData = useMemo(hookData, hookData);

  return (
    <Context.Provider value={memoizedHookData}>
      {children}
    </Context.Provider>
  );
}