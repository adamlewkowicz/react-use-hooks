import { useMemo, useCallback } from "react";


export function useCombineReducers(
  reducersDict: any
) {
  const { states, dispatches } = useMemo(() => {
    const reducers = Object.values(reducersDict);
    return {
      states: reducers.map(([state]) => state),
      dispatches: reducers.map(([, dispatch]) => dispatch)
    }
  }, []);

  const rootDispatch = useCallback((action) => {
    for (const dispatch of dispatches) {
      dispatch(action);
    }
  }, [dispatches]);

  const rootState = useMemo(() => , states);

  return [rootState, rootDispatch];
}