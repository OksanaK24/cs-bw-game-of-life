import React from "react";
import Board from "./components/Board"
import About from "./components/About"

function App() {

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "space-between",
      }}
    >
      <div
        style={{
          height: "450px",
        }}
      >
        <About />
      </div>
      <div
        style={{
          width: "75%",
          margin: "auto",
        }}
      >
        <Board />
      </div>

    </div>
  );
}

export default App;
