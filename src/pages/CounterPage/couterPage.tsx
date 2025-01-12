import Counter from "../../components/counterComponent";
import { get, set, State } from "../../lib/externalCounter";
import { createStore, useStore } from "../../lib/store";

const store = createStore({ count: 0 });

function StoreCounter() {
  const [state, setState] = useStore(store);
  console.log("RENDER STORE COUNTER");

  function handleClick() {
    setState((prev) => ({ count: prev.count + 1 }));
  }
  return (
    <>
      <h3>{state.count}</h3>
      <button onClick={handleClick}>click</button>
    </>
  );
}

function ExternalCounter() {
  const state = get();
  function handleClick() {
    set((prev: State) => ({ counter: prev.counter + 1 }));
  }
  return (
    <>
      <h3>{state.counter}</h3>
      <button onClick={handleClick}>click</button>
    </>
  );
}

function CounterPage() {
  return (
    <h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "center",
          gap: "32px",
        }}
      >
        <div>
          counter 예시 페이지
          <Counter />
          <Counter />
        </div>
        <div>
          externalCounter 예시
          <ExternalCounter />
          <ExternalCounter />
        </div>
        <div>
          storeCounter 예시
          <StoreCounter />
          <StoreCounter />
        </div>
      </div>
    </h3>
  );
}

export default CounterPage;
