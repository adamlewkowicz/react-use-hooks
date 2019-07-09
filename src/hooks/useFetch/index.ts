import { useReducer, useEffect, DependencyList, Reducer, useCallback, useMemo } from 'react';
import { fetchReducer, initialState, FetchAction, FetchState } from './reducer';
import { useLazyRef } from '../useLazyRef';

/**
 * Fetch-like API for handling async requests declaratively.
 * Uses AbortController to cancel previous calls, or to stop calls that have not been finished before unmount.
 * @param url - request `URL`.
 * @param config - Fetch request configuration.
 * @param depsOrOptions - List of dependecies, or options for `useFetch` hook.
 * @example
 * const { data: product, isLoading } = useFetch(`domain.com/products/${id}`);
 * 
 * if (isLoading) {
 *   return <div>Loading...</div>;
 * }
 * 
 * return <div>Product: {product.name}</div>;
 */
export function useFetch<T>(
  url: string,
  config?: RequestInit,
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

    const response = await fetch(url, { ...config, signal });

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
  }, [url, config, depsOrOptions, dispatch]);

  useEffect(() => {
    if (state.isLoading) {
      controller.abort();
    }
    handleRequest();

    return () => controller.abort();
  }, [url, config, ...dependencies]);


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

interface UseFetchResult<T> extends FetchState<T> {
  cancel: AbortController['abort']
}