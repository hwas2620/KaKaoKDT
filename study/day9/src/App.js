import React, { useState } from "react";

function App() {
  // 개별 상태들
  const [state, setState] = useState({
    score: 0,
    name: "Alice",
  });

  const incrementScore = () => {
    setState({ ...state, score: state.score + 1 });
  };
  const changeName = () => {
    setState({ ...state, name: state.name === "Alice" ? "Bob" : "Alice" });
  };

  return (
    <>
      <h1>점수: {state.score}</h1>
      <button onClick={incrementScore}>Increase Score</button>
      <h2>이름: {state.name}</h2>
      <button onClick={changeName}>Change Name</button>
    </>
  );
}
export default App;