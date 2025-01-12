import useCounter from "../../lib/counter";

function Counter() {
  const { counter, inc } = useCounter(0);

  return (
    <div>
      <h3>카운터: {counter}</h3>
      <button onClick={inc}>증가</button>
    </div>
  );
}

export default Counter;
