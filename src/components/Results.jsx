import Button from "./Button";
import ButtonsBlock from "./ButtonsBlock";

export default function Results({
  user,
  totalScore,
  correctNum,
  incorrectNum,
  maxCombo,
}) {
  // let best = JSON.parse(sessionStorage.getItem("sessionBestScore"));
  return (
    <div className="game">
      <p className="timeout">Time is up! Try again.</p>
      <ButtonsBlock>
        <Button text="Change Player" classes="false-button" />
        <Button text="Restart Game" classes="true-button" />
      </ButtonsBlock>
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
          Incorrect answers:{" "}
          <span className="special-text">{incorrectNum}</span>
        </h4>
        <h4>
          Max combo: <span className="special-text">{maxCombo}</span>
        </h4>
        {/* <h4>
          Session best: <span className="special-text">{best.name} - {best.score}</span>
        </h4> */}
      </div>
      <div className="scores">
        <h2 className="scores__header">Top Best Scores</h2>
        <table className="scores__table">
          <thead>
            <tr>
              <th className="number">#</th>
              <th className="ascending-order">PLAYER</th>
              <th className="ascending-order">SCORE</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
      <div className="review">
        <h2 className="review__header">Review Mentioned Words</h2>
        <table className="review__table dictionary">
          <thead>
            <tr>
              <th>DATE</th>
              <th title="Click to see the other meanings">WORD</th>
              <th title="Hover over to see the translation">TRANSLATION</th>
              <th title="Make a sentence/phrase using the word">SENTENCE</th>
              <th>X</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}
