import { useState } from "react";
import Description from "./components/Description";
import Game from "./components/Game";

for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  console.log(`${key}: ${value}`);
}

function App() {
  const [gameLevel, setGameLevel] = useState(0);
  const [userName, setUserName] = useState(null);
  const [isGameActive, setIsGameActive] = useState(false);

  function startGame(username, level) {
    setUserName(username);
    setGameLevel(level);
    if (username) {
      setIsGameActive(true);
      console.log("Game started");
    } else return;
  }

  function returnToHomePage() {
    console.log("Change player called");
    setIsGameActive(false);
  }

  return (
    <div id="container">
      {!isGameActive && <Description handleStartGame={startGame} />}
      {isGameActive && (
        <Game
          user={userName}
          level={gameLevel}
          handleReturnToHomePage={
            returnToHomePage
          }
        />
      )}
    </div>
  );
}

export default App;

// let existingPlayers = [
//   { name: "Rauf", score: 215 },
//   { name: "Qosha", score: 270 },
//   { name: "Elmir", score: 135 },
//   { name: "Aqil", score: 360 },
//   { name: "Elvin", score: 295 },
//   { name: "Orkhan", score: 155 },
//   { name: "Ismayil", score: 80 },
//   { name: "Elchin", score: 135 },
//   { name: "Yusif", score: 585 },
//   { name: "Kenan", score: 370 },
//   { name: "Chingiz", score: 305 },
// ];
