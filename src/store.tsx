import { FunctionComponent, createContext, ReactNode, useReducer, Dispatch, Reducer } from 'react'

export interface StoreContext {
  data: any
  playing?: string | null
  rating?: Record<string, number>
  dispatch?: Dispatch<any>
}

export const Store = createContext<StoreContext>({ data: null, playing: null })

export type Actions = 'playing-set' | 'rating-set'

interface ReducerAction {
  type: Actions
  payload: Record<string, any>
}

const reducer = (state: StoreContext, action: ReducerAction): StoreContext => {
  if (action.type === 'playing-set') {
    return { ...state, playing: action.payload.id }
  } else if (action.type === 'rating-set') {
    return {
      ...state,
      rating: {
        ...state.rating,
        [action.payload.id]: action.payload.value,
      }
    }
  }

  return state
}

const initialState = {
  playing: null,
  rating: {},
}

interface ContextProps {
  value: StoreContext
}

const StoreComponent: FunctionComponent<ContextProps> = ({ children, value }) => {
  const [state={}, dispatch] = useReducer<Reducer<any, any>>(reducer, initialState)
  return (
    <Store.Provider value={{ ...value, dispatch, ...state }}>
      {children}
    </Store.Provider>
  )
}

export default StoreComponent
