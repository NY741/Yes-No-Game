import PopUp from "./PopUp";
import Button from "./Button";
import ButtonsBlock from "./ButtonsBlock";
import Sentence from "./Sentence";
import { setExistingPlayers, getDate, getArrayOfWordsOnly } from "../functions";
import { useState, useEffect, useRef } from "react";

let initialReversedSortState = false;
let notifWord;

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
  currentPlayerIndex,
  handleChangePlayer,
  handleRestartGame,
}) {
  const [popupIsDisplayed, setPopupIsDisplayed] = useState(false);
  const [notifType, setNotifType] = useState(null);
  const [reviewWords, setReviewWords] = useState(gameWords.slice(0, wordsNum));
  const [dictionaryDisplayed, setDictionaryDisplayed] = useState(false);
  const [allIncorrectAdded, setAllIncorrectAdded] = useState(false);
  const [dictionary, setDictionary] = useState(
    [...userDataObj?.dictionary] || []
  );
  const [playersDisplayed, setPlayersDisplayed] = useState(false);
  const [isReversedSort, setIsReversedSort] = useState(
    initialReversedSortState
  );

  currentPlayerIndex = existingPlayers.findIndex((p) => p.name === user);
  let best = JSON.parse(sessionStorage.getItem("sessionBestScore"));
  setExistingPlayers(1, existingPlayers, user, totalScore);
  // console.log(best);
  // console.log(userDataObj);
  // console.log(incorrectWords);
  // console.log(dictionary);
  // console.log(existingPlayers);
  // console.log(currentPlayerIndex);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPopupIsDisplayed(false);

      return () => clearTimeout(timeout);
    }, 1000);
  });

  function isWordDuplicated(word) {
    let dictWords = getArrayOfWordsOnly(dictionary);
    return dictWords.includes(word);
  }

  function sortColumn(index, reverse) {
    let rows, switching, i, x, y, shouldSwitch;
    let table = document.querySelector(".scores__table");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < rows.length - 1; i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("td")[index];
        y = rows[i + 1].getElementsByTagName("td")[index];
        if (isNaN(x.innerHTML)) {
          if (!reverse) {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          } else {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          }
        } else {
          if (!reverse) {
            if (+x.innerHTML > +y.innerHTML) {
              shouldSwitch = true;
              break;
            }
          } else {
            if (+x.innerHTML < +y.innerHTML) {
              shouldSwitch = true;
              break;
            }
          }
        }
      }

      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }

    setIsReversedSort((sort) => !sort);
  }

  function showMoreScores() {
    let rows = Array.from(document.querySelectorAll(".scores__table tbody tr"));
    // for (let row of rows) row.classList.remove("hidden");
    for (let i = 0; i < 10; i++) {
      rows[i]?.classList.remove("hidden");
    }
    document.querySelector(".scores__table").classList.add("unmargined");
    setPlayersDisplayed(true);
    console.log("Top 10 players showed");
  }

  function addWordToDictionary(word, index) {
    if (isWordDuplicated(word.word1)) {
      notifWord = word.word1;
      setNotifType("duplicate");
      setPopupIsDisplayed(true);
      console.log("Word " + word.word1 + " is duplicated!");
      return;
    }

    setReviewWords((prev) => {
      const leftWords = [...prev];
      leftWords.splice([index], 1);
      return leftWords;
    });

    const newWord = {
      word1: word.word1,
      word2: word.word2,
      translation: word.translation,
      date: getDate(),
    };

    const updatedDictionary = [...dictionary, newWord];
    setDictionary(updatedDictionary);
    userDataObj.dictionary = updatedDictionary;
    localStorage.setItem(user, JSON.stringify(userDataObj));
    notifWord = word.word1;
    setNotifType("add");
    setPopupIsDisplayed(true);
    console.log("Word added to dictionary");
  }

  function addIncorrectWordsToDictionary() {
    let iWords = getArrayOfWordsOnly(incorrectWords);
    let dWords = getArrayOfWordsOnly(dictionary);

    const newWordsToAdd = [];
    const updatedReviewWords = [...reviewWords];

    iWords.forEach((iWord) => {
      if (!dWords.includes(iWord)) {
        const i = updatedReviewWords.findIndex((w) => w.word1 === iWord);
        if (i !== -1) {
          const word = updatedReviewWords[i];
          const newWord = {
            word1: word.word1,
            word2: word.word2,
            translation: word.translation,
            date: getDate(),
          };

          newWordsToAdd.push(newWord);
          updatedReviewWords.splice(i, 1);
        }
      } else {
        console.log("Word " + iWord + " is duplicated!");
      }
    });

    const updatedDictionary = [...dictionary, ...newWordsToAdd];
    setDictionary(updatedDictionary);
    setReviewWords(updatedReviewWords);
    setAllIncorrectAdded(true);
    setNotifType("add-incorrect");
    setPopupIsDisplayed(true);
    console.log("All incorrect words added to dictionary");
  }

  function removeWordFromDictionary(word, index) {
    const newDictionary = [...dictionary];
    newDictionary.splice(index, 1);
    setDictionary(newDictionary);
    userDataObj.dictionary = newDictionary;
    localStorage.setItem(user, JSON.stringify(userDataObj));
    notifWord = word.word1;
    setNotifType("remove");
    setPopupIsDisplayed(true);
    console.log("Word removed from dictionary");
  }

  function hideDictionary() {
    setDictionaryDisplayed(false);
  }

  function showDictionary() {
    setDictionaryDisplayed(true);
  }

  function updateUser(dictionary) {
    setDictionary(() => {
      const newDictionary = [...dictionary];
      return newDictionary;
    });
  }

  function incorrectSentenceEntered(word, sentence) {
    notifWord = word.word1;
    setNotifType("incorrect-entry");
    setPopupIsDisplayed(true);
  }

  function incorrectLengthUsed(sentence) {
    notifWord = sentence;
    setNotifType("incorrect-length");
    setPopupIsDisplayed(true);
  }

  return (
    <div className="game">
      {popupIsDisplayed && <PopUp type={notifType} word={notifWord}></PopUp>}
      <p className="timeout">Time is up! Try again.</p>
      <ButtonsBlock classes={dictionaryDisplayed ? null : "unmargined"}>
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
        <h4>
          Session best:{" "}
          <span className="special-text">
            {best.name} - {best.score}
          </span>
        </h4>
      </div>
      <div className="scores">
        <h2 className="scores__header">Top Best Scores</h2>
        <table
          className={`scores__table${
            existingPlayers.length <= 10 ? " unmargined" : ""
          }`}
        >
          <thead>
            <tr>
              <th
                className="number"
                onClick={() => sortColumn(0, isReversedSort)}
              >
                #
              </th>
              <th
                className={
                  isReversedSort ? "descending-order" : "ascending-order"
                }
                onClick={() => sortColumn(1, isReversedSort)}
              >
                PLAYER
              </th>
              <th
                className={
                  isReversedSort ? "descending-order" : "ascending-order"
                }
                onClick={() => sortColumn(2, isReversedSort)}
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
            playersDisplayed || existingPlayers.length <= 10
              ? "hidden"
              : "show-more-button"
          }
          onClick={showMoreScores}
        />
      </div>
      <div className="review">
        <h2 className="review__header">Review Mentioned Words</h2>
        {reviewWords.length ? (
          <table className="review__table">
            <thead>
              <tr>
                <th>DATE</th>
                <th title="Click to see the other meanings">WORD</th>
                <th title="Hover over to see the translation">TRANSLATION</th>
                <th title="Make a sentence/phrase using the word">SENTENCE</th>
                <th>X</th>
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

                    <td>
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
              text={dictionaryDisplayed ? "Hide Dictionary" : "Show Dictionary"}
              classes="button success-button"
              onClick={dictionaryDisplayed ? hideDictionary : showDictionary}
            />
          ) : null}
          {reviewWords.length && incorrectWords.length && !allIncorrectAdded ? (
            <Button
              text="Add All Incorrect Words"
              classes="button"
              onClick={addIncorrectWordsToDictionary}
            />
          ) : null}
        </ButtonsBlock>
        {dictionary.length && dictionaryDisplayed ? (
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
            <tbody>
              {dictionary.map((word, index) => {
                return (
                  <tr key={`${word.word1}-${index}`}>
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
                    <td>
                      <Button
                        text="x"
                        classes="action-button remove-word"
                        onClick={() => removeWordFromDictionary(word, index)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
        {!dictionary.length ? (
          <p className="special-text failure-text unmargined">
            Dictionary is empty!
          </p>
        ) : null}
      </div>
    </div>
  );
}

// let allIncorrect = getArrayOfWordsOnly(incorrectWords);
// let allDictionary = getArrayOfWordsOnly(dictionary);
// console.log(allIncorrect);
// console.log(allDictionary);
// for (let incorrectWord of allIncorrect) {
//   if (allDictionary.includes(incorrectWord)) continue;
//   const word = reviewWords.find((w) => w.word1 === incorrectWord);
//   console.log(word);
//   const i = reviewWords.findIndex((word) => word.word1 === incorrectWord);
//   console.log(i);

//   const newWord = {
//     word1: word.word1,
//     word2: word.word2,
//     translation: word.translation,
//     date: getDate(),
//   };

//   const updatedDictionary = [...dictionary, newWord];
//   userDataObj.dictionary = updatedDictionary;
//   localStorage.setItem(user, JSON.stringify(userDataObj));
//   setDictionary(updatedDictionary);
//   setReviewWords((prev) => {
//     const leftWords = [...prev];
//     leftWords.splice([i], 1);
//     return leftWords;
//   });
// }
