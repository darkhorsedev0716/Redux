export interface Action {
  type: string;
}

export type Reducer<S> = (state: S, action: Action) => S;

export type Dispatch = (action: any) => any;

export interface MiddlewareAPI<S> {
  dispatch: Dispatch;
  getState: () => S;
}

export interface Middleware {
  <S>(api: MiddlewareAPI<S>): (next: Dispatch) => Dispatch;
}

export interface Store<S> {
  dispatch: Dispatch;
  getState: () => S;
  subscribe: (listener: () => void) => () => void;
  replaceReducer: (reducer: Reducer<S>) => void;
}

export interface StoreCreator {
  <S>(reducer: Reducer<S>): Store<S>;
  <S>(reducer: Reducer<S>, enhancer: StoreEnhancer): Store<S>;
  <S>(reducer: Reducer<S>, initialState: S): Store<S>;
  <S>(reducer: Reducer<S>, initialState: S, enhancer: StoreEnhancer): Store<S>;
}

export type StoreEnhancer = (next: StoreCreator) => StoreCreator;

export const createStore: StoreCreator;

export function combineReducers<S>(reducers: {[key: string]: Reducer<any>}): Reducer<S>;
export function applyMiddleware<S>(...middlewares: Middleware[]): StoreEnhancer;


export interface ActionCreator {
  (...args: any[]): any;
}

export function bindActionCreators<T extends ActionCreator|{[key: string]: ActionCreator}>(actionCreators: T, dispatch: Dispatch): T;

// from DefinitelyTyped/compose-function
// Hardcoded signatures for 2-4 parameters
export function compose<A, B, C>(f1: (b: B) => C,
                                 f2: (a: A) => B): (a: A) => C;
export function compose<A, B, C, D>(f1: (b: C) => D,
                                    f2: (a: B) => C,
                                    f3: (a: A) => B): (a: A) => D;
export function compose<A, B, C, D, E>(f1: (b: D) => E,
                                       f2: (a: C) => D,
                                       f3: (a: B) => C,
                                       f4: (a: A) => B): (a: A) => E;

// Minimal typing for more than 4 parameters
export function compose<Result>(f1: (a: any) => Result,
                                ...functions: Function[]): (a: any) => Result;
