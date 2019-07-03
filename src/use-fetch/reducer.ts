
export interface FetchState<T> {
  isLoading: boolean
  isError: boolean
  response: Response | null
  data: T | null
}

export const initialState: FetchState<any> = {
  isLoading: true,
  isError: false,
  response: null,
  data: null,
}

export function fetchReducer<T>(
  state: FetchState<T>,
  action: FetchAction<T>
): FetchState<T> {
  switch(action.type) {
    case 'FETCH_REQUESTED': return {
      ...state,
      isLoading: true,
      isError: false
    }
    case 'FETCH_SUCCEEDED': return {
      ...state,
      response: action.payload.response,
      data: action.payload.data,
      isLoading: false,
      isError: false
    }
    case 'FETCH_FAILED': return {
      ...state,
      response: action.payload.response,
      data: null,
      isLoading: false,
      isError: true
    }
    default: throw Error;
  }
}

interface FetchRequested {
  type: 'FETCH_REQUESTED'
}

interface FetchSucceeded<T> {
  type: 'FETCH_SUCCEEDED'
  payload: {
    data: T
    response: Response
  }
}

interface FetchFailed {
  type: 'FETCH_FAILED'
  payload: {
    response: Response
  }
}

export type FetchAction<T> =
  | FetchRequested
  | FetchSucceeded<T>
  | FetchFailed;