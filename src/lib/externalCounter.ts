export type State = { counter: number };
let state: State = {
  counter: 0,
};
export function get(): State {
  return state;
}
type Initializer<T> = T extends any ? T | ((prev: T) => T) : never;

export function set<T>(nextState: Initializer<T>) {
  state = typeof nextState === "function" ? nextState(state) : nextState;
}
