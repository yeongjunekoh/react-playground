import { useEffect, useState } from "react";

type Initializer<T> = T extends any ? T | ((prev: T) => T) : never;
type Store<State> = {
  get: () => State; // 항상 최신값을 가져오기 위해 함수로 구현
  set: (action: Initializer<State>) => State; // useState와 동일하게 값 또는 함수를 받을 수 있도록 제작
  subscribe: (callback: () => void) => () => void;
  // store의 변경을 감지하고 싶은 컴포넌트들이 자신의 callback을 등록해두는 곳
  // callback을 인수로 받으며, store는 값이 변경될 때마다 자신에게 등록된 모든 callback을 실행
  // 이 store를 참조하는 컴포넌트는 subscribe에 컴포넌트 자기 자신을 렌더링하는 코드를 추가해서 컴포넌트가 리렌더링 할 수 있도록 함.
};
export const createStore = <State extends unknown>(
  initialState: Initializer<State>
): Store<State> => {
  // useState와 마찬가지로 초깃값을 게으른 초기화를 위한 함수 또한
  // 그냥 값을 받을 수 있도록 한다.
  // state의 값은 스토어 내부에서 보관해야 하므로 변수로 선언한다.
  let state: State =
    typeof initialState !== "function" ? initialState : initialState();

  // callbacks는 자료형에 관계없이 유일한 값을 저장할 수 있는 Set으로 선언한다.
  const callbacks = new Set<() => void>();

  // 언제든 get이 호출되면 최신값을 가져올 수 있도록 함수로 만든다.
  const get = () => state;

  const set = (nextState: State | ((prev: State) => State)) => {
    state =
      typeof nextState === "function"
        ? (nextState as (prev: State) => State)(state)
        : nextState;

    // 값의 설정이 발생하면 콜백 목록을 순회하면서 모든 콜백을 실행한다.
    callbacks.forEach((callback) => callback());
    return state;
  };

  // subscribe는 콜백을 인수로 받는다.
  const subscribe = (callback: () => void) => {
    // 받은 함수를 콜백 목록에 추가한다.
    callbacks.add(callback);
    // 클린업 실행 시 이를 삭제해서 반복적으로 실행하는 것을 막는다.
    return () => {
      callbacks.delete(callback);
    };
  };

  return { get, set, subscribe };
};

export const useStore = <State extends unknown>(store: Store<State>) => {
  const [state, setState] = useState(() => store.get());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => setState(store.get()));
    return unsubscribe;
  }, [store]);

  return [state, store.set] as const;
};

export const useStoreSelector = <State extends unknown, Value extends unknown>(
  store: Store<State>,
  selector: (state: State) => Value
) => {
  const [state, setState] = useState(() => selector(store.get()));

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const value = selector(store.get());
      setState(value);
    });
    return unsubscribe;
  }, [store, selector]);

  return state;
};
