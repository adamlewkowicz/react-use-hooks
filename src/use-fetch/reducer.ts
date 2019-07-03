
export interface FetchState<T> {
  isFetching: boolean
  isError: boolean
  response: Response | null
  data: T | null
}

export const initialState: FetchState<any> = {
  isFetching: true,
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
      isFetching: true,
      isError: false
    }
    case 'FETCH_SUCCEEDED': return {
      ...state,
      response: action.payload.response,
      data: action.payload.data,
      isFetching: false,
      isError: false
    }
    case 'FETCH_FAILED': return {
      ...state,
      response: action.payload.response,
      data: null,
      isFetching: false,
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