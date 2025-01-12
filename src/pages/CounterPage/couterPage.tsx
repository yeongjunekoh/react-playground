import { useState } from "react";
import Counter from "../../components/counterComponent";
import { get, set, State } from "../../lib/externalCounter";

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
      counter 예시 페이지
      <Counter />
      <Counter />
      externalCounter 예시
      <ExternalCounter />
      <ExternalCounter />
    </h3>
  );
}

export default CounterPage;
