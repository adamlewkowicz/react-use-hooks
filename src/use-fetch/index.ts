import { useReducer, useEffect, DependencyList, Reducer, useCallback, useMemo } from 'react';
import { fetchReducer, initialState, FetchAction, FetchState } from './reducer';
import { useLazyRef } from '../use-lazy-ref';

export function useFetch<T>(
  url: string,
  options?: RequestInit,
  depsOrOptions: DepsOrOptions = defaultOptions
): UseFetchResult<T> {
  const { parser, deps: dependencies } = useMemo(() =>
    parseOptions(depsOrOptions), 
    [depsOrOptions]
  );
  const [state, dispatch] = useReducer<Reducer<FetchState<T>, FetchAction<T>>>(
    fetchReducer, initialState
  );
  const { current: controller } = useLazyRef(() => new AbortController());

  const handleRequest = useCallback(async () => {
    const { signal } = controller;

    dispatch({ type: 'FETCH_REQUESTED' });

    const response = await fetch(url, { ...options, signal });

    if (response.ok) {
      const data: T = await response[parser]();
      dispatch({
        type: 'FETCH_SUCCEEDED',
        payload: {
          response,
          data
        }
      });
    } else {
      dispatch({
        type: 'FETCH_FAILED',
        payload: { response }
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (state.isFetching) {
      controller.abort();
    }
    handleRequest();

    return () => controller.abort();
  }, dependencies);


  return {
    ...state,
    cancel: controller.abort
  }
}

const defaultOptions: ParsedOptions = {
  parser: 'json',
  deps: []
}

function parseOptions(depsOrOptions: DepsOrOptions): ParsedOptions {
  if (Array.isArray(depsOrOptions)) {
    return {
      ...defaultOptions,
      deps: depsOrOptions
    }
  }
  return {
    ...defaultOptions,
    ...depsOrOptions
  }
}

type DepsOrOptions = DependencyList | UseFetchOptions;

interface UseFetchOptions {
  parser?: 'json' | 'text' | 'arrayBuffer' | 'blob' | 'formData'
  deps?: DependencyList
}

interface ParsedOptions {
  parser: 'json' | 'text' | 'arrayBuffer' | 'blob' | 'formData'
  deps: DependencyList 
}

interface UseFetchResult<T> {
  isFetching: boolean
  isError: boolean
  response: Response | null
  data: T | null
  cancel: AbortController['abort']
}