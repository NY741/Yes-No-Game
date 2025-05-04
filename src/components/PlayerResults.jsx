import { useContext } from "react";
import { ResultsContext } from "../store/results-context";
import { setExistingPlayers } from "../functions";

export default function PlayerResults() {
  const {
    user,
    totalScore,
    correctNum,
    incorrectNum,
    maxCombo,
    existingPlayers,
  } = useContext(ResultsContext);

  const best = JSON.parse(sessionStorage.getItem("sessionBestScore"));
  setExistingPlayers(1, existingPlayers, user, totalScore);

  return (
    <div className="results">
      <h2 className="results__header">Current Player Results</h2>
      <h4>
        Player: <span className="special-text mark-word">{user}</span>
      </h4>
      <h4>
        Your total score: <span className="special-text">{totalScore}</span>
      </h4>
      <h4>
        Correct answers: <span className="special-text">{correctNum}</span>
      </h4>
      <h4>
        Incorrect answers: <span className="special-text">{incorrectNum}</span>
      </h4>
      <h4>
        Max combo: <span className="special-text">{maxCombo}</span>
      </h4>
      <h4>
        Session best:{" "}
        <span className="special-text">
          {best.name} - {best.score}
        </span>
      </h4>
    </div>
  );
}
