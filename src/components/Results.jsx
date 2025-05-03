import Button from "./Button";
import ButtonsBlock from "./ButtonsBlock";
import PlayerResults from "./PlayerResults";
import PlayersScores from "./PlayersScores";
import GameReview from "./GameReview";
import { setExistingPlayers, getDate, getArrayOfWordsOnly } from "../functions";
import { useEffect } from "react";

export default function Results({
  user,
  userDataObj,
  totalScore,
  correctNum,
  incorrectNum,
  maxCombo,
  existingPlayers,
  gameWords,
  incorrectWords,
  wordsNum,
  handleChangePlayer,
  handleRestartGame,
}) {

  const playedWordsCount = gameWords.slice(0, wordsNum).length;
  const correctWordsCount = playedWordsCount - incorrectWords.length;
  let best = JSON.parse(sessionStorage.getItem("sessionBestScore"));
  setExistingPlayers(1, existingPlayers, user, totalScore);

  return (
    <div className="game">
      <p className="timeout">Time is up! Try again.</p>
      <ButtonsBlock classes="unmargined">
        <Button
          text="Change Player"
          classes="failure-button"
          onClick={handleChangePlayer}
        />
        <Button
          text="Restart Game"
          classes="success-button"
          onClick={handleRestartGame}
        />
      </ButtonsBlock>
      <PlayerResults
        user={user}
        totalScore={totalScore}
        correctNum={correctNum}
        incorrectNum={incorrectNum}
        maxCombo={maxCombo}
        best={best}
      />
      <PlayersScores user={user} existingPlayers={existingPlayers} />
      <GameReview
        user={user}
        userDataObj={userDataObj}
        gameWords={gameWords}
        wordsNum={wordsNum}
        playedWordsCount={playedWordsCount}
        correctWordsCount={correctWordsCount}
        incorrectWords={incorrectWords}
      />

      {/* <div className="results">
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
        <h4>
          Session best:{" "}
          <span className="special-text">
            {best.name} - {best.score}
          </span>
        </h4>
      </div> */}
      {/* <div className="scores">
        <h2 className="scores__header">Top Best Scores</h2>
        <table
          ref={scoresTable}
          className={`scores__table${
            existingPlayers.length <= 10 ? " unmargined" : ""
          }`}
        >
          <thead>
            <tr>
              <th
                className="number"
                onClick={() =>
                  sortColumn(0, isReversedSort, scoresTable.current)
                }
              >
                #
              </th>
              <th
                className={
                  isReversedSort ? "descending-order" : "ascending-order"
                }
                onClick={() =>
                  sortColumn(1, isReversedSort, scoresTable.current)
                }
              >
                PLAYER
              </th>
              <th
                className={
                  isReversedSort ? "descending-order" : "ascending-order"
                }
                onClick={() =>
                  sortColumn(2, isReversedSort, scoresTable.current)
                }
              >
                SCORE
              </th>
            </tr>
          </thead>
          <tbody>
            {existingPlayers.map((player, index) => {
              return (
                <tr
                  key={`${player.name}-${index}`}
                  // className={index > 4 ? "hidden" : ""}
                  className={
                    currentPlayerIndex === index
                      ? "current-player"
                      : index > 4
                      ? "hidden"
                      : ""
                  }
                >
                  <td>{index + 1}</td>
                  <td>{player.name}</td>
                  <td>{player.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Button
          text="Show More Players"
          classes={
            isPlayersDisplayed || existingPlayers.length <= 10
              ? "hidden"
              : "show-more-button"
          }
          onClick={showMoreScores}
        />
      </div> */}
      {/* <div className="review">
        <h2 className="review__header">Review Mentioned Words</h2>
        <p className="special-text black-white">
          Played pair-words count: <mark>{playedWordsCount}</mark>&nbsp;
          Correct: <mark className="success">{correctWordsCount}</mark>&nbsp;
          Incorrect: <mark className="failure">{incorrectWords.length}</mark>
        </p>
        {reviewWords.length ? (
          <table ref={reviewTable} className="review__table">
            <thead>
              <tr>
                <th
                  title="First word to compare"
                  className={
                    isReversedSort ? "descending-order" : "ascending-order"
                  }
                  onClick={() =>
                    sortColumn(0, isReversedSort, reviewTable.current)
                  }
                >
                  WORD1
                </th>
                <th
                  title="Second word to compare"
                  className={
                    isReversedSort ? "descending-order" : "ascending-order"
                  }
                  onClick={() =>
                    sortColumn(1, isReversedSort, reviewTable.current)
                  }
                >
                  WORD2
                </th>
                <th title="Correct answer">IS CORRECT?</th>
                <th title="Player answer">ANSWER IS</th>
                <th>+</th>
              </tr>
            </thead>
            <tbody>
              {reviewWords.map((word, index) => {
                return (
                  <tr
                    key={`${word.word1}-${index}`}
                    className={word.userAnswer ? "true" : "false"}
                  >
                    <td>{word.word1}</td>
                    <td>{word.word2}</td>
                    <td>{word.correct ? "true" : "false"}</td>
                    <td>{word.userAnswer ? "correct" : "incorrect"}</td>
                    <td title="Add word to dictionary">
                      <Button
                        text="+"
                        classes="action-button add-word"
                        onClick={() => addWordToDictionary(word, index)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="special-text">
            There are no words to review in the game!
          </p>
        )}

        <ButtonsBlock classes={!dictionary.length ? null : "unmargined"}>
          {dictionary.length ? (
            <Button
              text={
                isDictionaryDisplayed ? "Hide Dictionary" : "Show Dictionary"
              }
              onClick={isDictionaryDisplayed ? hideDictionary : showDictionary}
            />
          ) : null}
          {dictionary.length && isDictionaryDisplayed ? (
            <Button
              text={isLearnedDisplayed ? "Hide Learned" : "Show Learned"}
              onClick={isLearnedDisplayed ? hideLearnedWords : showLearnedWords}
            />
          ) : null}
          {reviewWords.length && incorrectWords.length && !allIncorrectAdded ? (
            <Button
              text="Add All Incorrect Words"
              onClick={addIncorrectWordsToDictionary}
            />
          ) : null}
        </ButtonsBlock>
        {dictionary.length && isDictionaryDisplayed ? (
          <>
            <table ref={dictTable} className="review__table dictionary">
              <thead>
                <tr>
                  <th
                    className={
                      isReversedSort ? "descending-order" : "ascending-order"
                    }
                    onClick={() =>
                      sortColumn(0, isReversedSort, dictTable.current)
                    }
                  >
                    DATE
                  </th>
                  <th
                    title="Click to see the other meanings"
                    className={
                      isReversedSort ? "descending-order" : "ascending-order"
                    }
                    onClick={() =>
                      sortColumn(1, isReversedSort, dictTable.current)
                    }
                  >
                    WORD
                  </th>
                  <th title="Hover over to see the translation">TRANSLATION</th>
                  <th title="Make a sentence/phrase using the word">
                    SENTENCE
                  </th>
                  <th title="List word as learnt">✔</th>
                  <th title="Remove word from dictionary">X</th>
                </tr>
              </thead>
              <tbody>
                {dictionary.map((word, index) => {
                  return isLearnedDisplayed || !word.isLearned ? (
                    <tr
                      key={`${word.word1}-${index}`}
                      className={word.isLearned ? "learned-word" : undefined}
                    >
                      <td>{word.date}</td>
                      <td>
                        <a
                          href={`https://translate.google.com/?sl=en&tl=ru&text=${dictionary[index].word1}&op=translate`}
                          target="_blank"
                        >
                          {word.word1}
                        </a>
                      </td>
                      <td>{word.translation}</td>
                      <td>
                        <Sentence
                          word={word}
                          user={user}
                          userDataObj={userDataObj}
                          handleUpdateUser={updateUser}
                          handleIncorrectEntry={incorrectSentenceEntered}
                          handleIncorrectLength={incorrectLengthUsed}
                        />
                      </td>
                      <td
                        title={
                          word.isLearned
                            ? "Unmark as learned"
                            : "Mark as learned"
                        }
                      >
                        <Button
                          text={word.isLearned ? "x" : "✔"}
                          classes={`action-button ${
                            word.isLearned ? "unmark" : "add"
                          }-word`}
                          onClick={() =>
                            markWordAsLearnt(word, index, word.isLearned)
                          }
                        />
                      </td>
                      <td title="Remove word from dictionary">
                        <Button
                          text="x"
                          classes="action-button remove-word"
                          onClick={() => removeWordFromDictionary(word, index)}
                        />
                      </td>
                    </tr>
                  ) : null;
                })}
              </tbody>
            </table>
          </>
        ) : null}
        {!dictionary.length ? (
          <p className="special-text failure-text">Dictionary is empty!</p>
        ) : null}
        <p className="special-text unmargined">
          Learned words count: <mark>{learnedWordsCount}</mark>
        </p>
      </div> */}
    </div>
  );
}

// console.log(best);
// console.log(userDataObj);
// console.log(incorrectWords);
// console.log(dictionary);
// console.log(existingPlayers);
// console.log(currentPlayerIndex);
