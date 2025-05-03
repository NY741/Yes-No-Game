import Sentence from "./Sentence";
import PopUp from "./PopUp";
import Button from "./Button";
import ButtonsBlock from "./ButtonsBlock";
import { useState, useEffect, useRef } from "react";
import { getDate, getArrayOfWordsOnly } from "../functions";

let initSortState = false;
let notifWord;
let notifType;

export default function GameReview({
  user,
  userDataObj,
  gameWords,
  wordsNum,
  playedWordsCount,
  correctWordsCount,
  incorrectWords,
}) {
  const [isReversedSort, setIsReversedSort] = useState(initSortState);
  const [isPopupDisplayed, setIsPopupDisplayed] = useState(false);
  const [isDictionaryDisplayed, setIsDictionaryDisplayed] = useState(false);
  const [isLearnedDisplayed, setIsLearnedDisplayed] = useState(true);
  const [allIncorrectAdded, setAllIncorrectAdded] = useState(false);
  const [reviewWords, setReviewWords] = useState(gameWords.slice(0, wordsNum));
  const [dictionary, setDictionary] = useState(
    [...userDataObj?.dictionary] || []
  );

  const reviewTable = useRef();
  const dictTable = useRef();

  const learnedWordsCount = getLearnedWordsCount();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsPopupDisplayed(false);
      return () => clearTimeout(timeout);
    }, 1000);
  });

  function isWordDuplicated(word) {
    let dictWords = getArrayOfWordsOnly(dictionary);
    return dictWords.includes(word);
  }

  function sortColumn(index, reverse, table) {
    let rows, switching, i, x, y, shouldSwitch;
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

  function addWordToDictionary(word, index) {
    if (isWordDuplicated(word.word1)) {
      showPopupNotification(word.word1, "duplicate");
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
      learned: word.learned,
      date: getDate(),
    };

    const updatedDictionary = [...dictionary, newWord];
    setDictionary(updatedDictionary);
    userDataObj.dictionary = updatedDictionary;
    localStorage.setItem(user, JSON.stringify(userDataObj));
    showPopupNotification(word.word1, "add");
    console.log("Word added to dictionary");
  }

  function addIncorrectWordsToDictionary() {
    let iWords = getArrayOfWordsOnly(incorrectWords);
    let dWords = getArrayOfWordsOnly(dictionary);

    const currentDictionary = [...dictionary];
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
            learned: word.learned,
            sentence: "",
            date: getDate(),
          };

          newWordsToAdd.push(newWord);
          updatedReviewWords.splice(i, 1);
        }
      } else {
        console.log("Word " + iWord + " is duplicated!");
      }
    });

    const updatedDictionary = [...currentDictionary, ...newWordsToAdd];

    userDataObj.dictionary = updatedDictionary;
    localStorage.setItem(user, JSON.stringify(userDataObj));
    setDictionary(updatedDictionary);
    setReviewWords(updatedReviewWords);
    setAllIncorrectAdded(true);
    showPopupNotification("All incorrect words", "add-incorrect");
    console.log("All incorrect words added to dictionary");
  }

  function getLearnedWordsCount() {
    let count = 0;
    const dictionary = userDataObj.dictionary;
    for (let word of dictionary) if (word.isLearned) count++;
    return count;
  }

  function markWordAsLearnt(word, index, isLearned) {
    const newDictionary = [...dictionary];
    newDictionary[index].isLearned = !isLearned;
    setDictionary(newDictionary);
    userDataObj.dictionary = newDictionary;
    localStorage.setItem(user, JSON.stringify(userDataObj));
    showPopupNotification(word.word1, isLearned ? "forget" : "learn");
    console.log(`Word ${isLearned ? "un" : ""}marked as learned`);
  }

  function showLearnedWords() {
    setIsLearnedDisplayed(true);
    console.log("Learned words are displayed");
  }

  function hideLearnedWords() {
    setIsLearnedDisplayed(false);
    console.log("Learned words are hidden");
  }

  function removeWordFromDictionary(word, index) {
    const newDictionary = [...dictionary];
    newDictionary.splice(index, 1);
    setDictionary(newDictionary);
    userDataObj.dictionary = newDictionary;
    localStorage.setItem(user, JSON.stringify(userDataObj));
    showPopupNotification(word.word1, "remove");
    console.log("Word removed from dictionary");
  }

  function hideDictionary() {
    setIsDictionaryDisplayed(false);
  }

  function showDictionary() {
    setIsDictionaryDisplayed(true);
  }

  function updateUser(dictionary) {
    setDictionary(() => {
      const newDictionary = [...dictionary];
      return newDictionary;
    });
  }

  function incorrectSentenceEntered(word) {
    showPopupNotification(word, "incorrect-entry");
  }

  function incorrectLengthUsed(word) {
    showPopupNotification(word, "incorrect-length");
  }

  function showPopupNotification(word, type) {
    notifWord = word;
    notifType = type;
    setIsPopupDisplayed(true);
  }

  return (
    <div className="review">
      {isPopupDisplayed && <PopUp type={notifType} word={notifWord}></PopUp>}
      <h2 className="review__header">Review Mentioned Words</h2>
      <p className="special-text black-white">
        Played pair-words count: <mark>{playedWordsCount}</mark>&nbsp; Correct:{" "}
        <mark className="success">{correctWordsCount}</mark>&nbsp; Incorrect:{" "}
        <mark className="failure">{incorrectWords.length}</mark>
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
            text={isDictionaryDisplayed ? "Hide Dictionary" : "Show Dictionary"}
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
                <th title="Make a sentence/phrase using the word">SENTENCE</th>
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
                        word.isLearned ? "Unmark as learned" : "Mark as learned"
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
      <p className="special-text black-white unmargined">
        Dictionary words count: <mark>{dictionary.length}</mark>&nbsp; Learned
        words count: <mark>{learnedWordsCount}</mark>
      </p>
    </div>
  );
}
