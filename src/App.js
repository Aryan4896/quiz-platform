import React from "react";
import Quiz from "./components/Quiz";
import Lottie from "lottie-react";
import thinkingAnimation from "./assets/thinking.json";

function App() {
  return (
    <div className="App">
      <h1>Interactive Quiz Platform</h1>
      <Lottie
        animationData={thinkingAnimation}
        loop={true}
        style={{ height: 200 }}
      />
      <Quiz />
    </div>
  );
}

export default App;
