import { useState } from "react";
import Description from "./components/Description";
import Game from "./components/Game";

let gameLevel = 0;
let userName = null;

function App() {
  const [isGameActive, setIsGameActive] = useState(true);
  // console.log(isGameActive);

  // function startGame(username, level) {
  //   setIsGameActive(true);
  //   console.log("Game started");
  //   gameLevel = level;
  //   userName = username;
  // }

  return (
    <div id="container">
      {/* {!isGameActive && <Description handleStartGame={startGame} />} */}
      {isGameActive && <Game user={userName} level={1} />}
    </div>
  );
}

export default App;
