import Timer from "./Timer.jsx";
import Hints from "./Hints";
import ProgressBar from "./ProgressBar";
import WordsBlock from "./WordsBlock";
import Translation from "./Translation.jsx";
import Scores from "./Scores.jsx";
import ButtonsBlock from "./ButtonsBlock.jsx";
import Button from "./Button.jsx";
import Results from "./Results.jsx";
import wordStock from "../wordStock.js";
import { mixWords } from "../functions.js";
import { useState, useEffect } from "react";

let existingPlayers = [];
// setExistingPlayers(0);
console.log(localStorage);
const initTimeMap = [100, 50, 25];
let leftSeconds = 0; // new feature
let progressBarCurrValue = 100;
let words = [...wordStock];
const mixedWords = mixWords(words);
let skipWordCount = 3;
let playerTotalScore = 0;
let maxCombo = 0;
let correctNum = 0;
let correctRowNum = 0;
let incorrectNum = 0;
let incorrectRowNum = 0;
let isGamePaused = false;
let isPauseAllowed = true;

export default function Game({ user, level }) {
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [currentNum, setCurrentNum] = useState(0);
  const [isTranslationShowed, setIsTranslationShowed] = useState(false);


  // const [isTimeAdded, setTimeAdded] = useState(false);
  // const userDataObj = JSON.parse(localStorage.getItem(user));
  // const isNewPlayer = checkNewPlayer();
  const timer = initTimeMap[level - 1];
  leftSeconds = timer;

  let currentWord = {
    word1: mixedWords[currentNum].word1,
    word2: mixedWords[currentNum].word2,
    correct: mixedWords[currentNum].correct,
    translation: mixedWords[currentNum].translation,
  };

  function checkNewPlayer() {
    for (let player of existingPlayers) if (user === player.name) return false;
    return true;
  }

  function addTime() {
    console.log("Time added");
    let addTimeMap = [20, 15, 10];
    leftSeconds += addTimeMap[level - 1];
    console.log(leftSeconds);
  }

  function showTranslation() {
    console.log("Translation showed");
    setIsTranslationShowed(true);
  }

  function handleSelectedAnswer(correct, currentWord) {
    console.log(currentWord.correct === correct);
    setCurrentNum(currentNum + 1);
  }

  function changeTime(remainingTime) {
    remainingTime /= 1000;
    // console.log(remainingTime)
    progressBarCurrValue = (remainingTime / timer) * 100;
    console.log(progressBarCurrValue);
  }

  return (
    <main className="game">
      {isGameFinished ? (
        <Results
          user={user}
          totalScore={playerTotalScore}
          correctNum={correctNum}
          incorrectNum={incorrectNum}
          maxCombo={maxCombo}
        />
      ) : (
        <>
          <Timer time={leftSeconds} handleTimeChange={changeTime} />
          <Hints
            handleShowTranslationHint={showTranslation}
            handleAddTimeHint={addTime}
          />
          <ProgressBar currValue={progressBarCurrValue} maxValue={100} />
          <WordsBlock word1={currentWord.word1} word2={currentWord.word2} />
          {isTranslationShowed ? <Translation word={currentWord} /> : null}
          <Scores score={playerTotalScore} />
          <ButtonsBlock>
            <Button
              text="Yes"
              classes="true-button"
              onClick={() => handleSelectedAnswer(true, currentWord)}
            />
            <Button
              text="No"
              classes="false-button"
              onClick={() => handleSelectedAnswer(false, currentWord)}
            />
          </ButtonsBlock>
        </>
      )}
    </main>
  );
}
