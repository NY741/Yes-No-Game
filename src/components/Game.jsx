import BlinkingScore from "./BlinkingScore.jsx";
import Timer from "./Timer.jsx";
import Tooltips from "./Tooltips";
import ProgressBar from "./ProgressBar";
import WordsBlock from "./WordsBlock";
import Translation from "./Translation.jsx";
import Scores from "./Scores.jsx";
import ButtonsBlock from "./ButtonsBlock.jsx";
import Button from "./Button.jsx";
import ResultsModal from "./ResultsModal.jsx";
import Results from "./Results.jsx";
import wordStock from "../wordStock.js";
import {
  mixWords,
  getDate,
  updateSessionStorage,
  setExistingPlayers,
} from "../functions.js";
import { useState, useEffect } from "react";

// const initTimeMap = [60, 45, 30];
const initTimeMap = [30, 20, 10];
const words = [...wordStock];
let mixedWords = mixWords(words);
let incorrectWords = [];
let playerTotalScore = 0;
let maxCombo = 0;
let correctNum = 0;
let correctRowNum = 0;
let incorrectNum = 0;
let incorrectRowNum = 0;
let existingPlayers = [];
setExistingPlayers(0, existingPlayers);

export default function Game({
  user,
  level,
  changePlayer,
  restartGame,
  handleReturnToHomePage,
}) {
  const [currentNum, setCurrentNum] = useState(0);
  const [blinkKey, setBlinkKey] = useState(0);
  const [direction, setDirection] = useState(null);
  const [leftSeconds, setLeftSeconds] = useState(initTimeMap[level - 1]);
  const [progressValue, setProgressValue] = useState(100);
  const [isTranslationShowed, setIsTranslationShowed] = useState(false);
  const [isGamePaused, setIsGamePaused] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isDangerStyled, setIsDangerStyled] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isGameFinished) setIsDangerStyled(false);

      return () => clearTimeout(timeout);
    }, 5000);
  }, [isDangerStyled]);

  // let currentPlayerIndex;
  const isNewPlayer = checkNewPlayer();

  if (isNewPlayer) {
    localStorage.setItem(
      user,
      JSON.stringify({ name: user, score: 0, dictionary: [] })
    );
  }

  let userDataObj = JSON.parse(localStorage.getItem(user));
  const timer = initTimeMap[level - 1];
  let currentWord = mixedWords[currentNum] || {
    word1: "",
    word2: "",
    correct: false,
    traslation: "",
  };

  function checkNewPlayer() {
    for (let player of existingPlayers) if (user === player.name) return false;
    return true;
  }

  function addTime() {
    const addTimeMap = [20, 15, 10];
    // leftSeconds += addTimeMap[level - 1];
    setLeftSeconds((prev) => prev + addTimeMap[level - 1]);
    console.log("Time added");
  }

  function showTranslation(isTranslated) {
    setIsTranslationShowed(isTranslated);
    console.log(`Translation ${isTranslated ? "shown" : "hidden"}`);
  }

  function pauseGame(isPauseAllowed) {
    if (isPauseAllowed) setIsGamePaused(true);
  }

  function resumeGame(isPauseAllowed) {
    setIsGamePaused(false);
  }

  function handleCheckAnswer(answer) {
    checkAnswer(answer, currentWord);
  }

  function checkAnswer(correct, currentWord) {
    if (isGamePaused) return;
    const isCorrect = currentWord.correct === correct;

    if (isCorrect) {
      mixedWords[currentNum].userAnswer = true;
      correctNum++;
      correctRowNum++;
      incorrectRowNum = 0;
      if (correctRowNum > maxCombo) maxCombo = correctRowNum;

      if (correctRowNum > 50) {
        playerTotalScore = playerTotalScore + 50;
        setLeftSeconds((prev) => prev + 3);
      } else if (correctRowNum > 40) {
        playerTotalScore = playerTotalScore + 40;
        setLeftSeconds((prev) => prev + 2);
      } else if (correctRowNum > 30) {
        playerTotalScore = playerTotalScore + 30;
        setLeftSeconds((prev) => prev + 2);
      } else if (correctRowNum > 20) {
        playerTotalScore = playerTotalScore + 20;
        setLeftSeconds((prev) => prev + 2);
      } else if (correctRowNum >= 10) {
        playerTotalScore = playerTotalScore + 15;
        setLeftSeconds((prev) => prev + 1);
      } else {
        playerTotalScore = playerTotalScore + 10;
      }

      setDirection("increase");
    } else {
      incorrectWords.push({
        word1: mixedWords[currentNum].word1,
        word2: mixedWords[currentNum].word2,
        correct: mixedWords[currentNum].correct,
        translation: mixedWords[currentNum].translation,
        date: getDate(),
      });
      incorrectNum++;
      correctRowNum = 0;
      incorrectRowNum++;
      setLeftSeconds((prev) => prev - 2);
      playerTotalScore = playerTotalScore - 5;
      setDirection("decrease");
    }

    setBlinkKey((prev) => prev + 1);
    if (playerTotalScore < 0) playerTotalScore = 0;
    if (currentNum + 1 >= mixedWords.length) {
      console.log("We used every possible word in the dictionary!");
      finishGame();
    } else {
      setCurrentNum(currentNum + 1);
    }
  }

  function changeWords() {
    if (currentNum + 1 >= mixedWords.length) {
      finishGame();
    } else {
      setCurrentNum(currentNum + 1);
      incorrectWords.push({
        word1: mixedWords[currentNum].word1,
        word2: mixedWords[currentNum].word2,
        correct: false, // will be changed to different condition soon
        translation: mixedWords[currentNum].translation,
        date: getDate(),
      });
    }
  }

  function changeTime(remainingTime) {
    if (remainingTime >= 0) {
      // check if this demanded !
      let value = (remainingTime / 1000 / timer) * 100;
      setProgressValue(value);
    }
  }

  function updateBestResults(isNew, user, currentScore) {
    console.log(user, "is", isNew ? "a New Player" : "an Existing Player");

    if (isNew) {
      const newUserDataObj = {
        name: user,
        score: currentScore,
        dictionary: [],
      };
      localStorage.setItem(user, JSON.stringify(newUserDataObj));
      existingPlayers.push({ name: user, score: currentScore });
    } else {
      const previousScore = userDataObj.score;
      if (currentScore > previousScore) {
        console.log("it works");
        userDataObj.score = currentScore;
        localStorage.setItem(user, JSON.stringify(userDataObj));
        setExistingPlayers(1, existingPlayers, user, currentScore);
      }
    }

    existingPlayers.sort((a, b) => b.score - a.score);
  }

  function finishGame() {
    // console.log(currentPlayerIndex);
    updateSessionStorage(user, playerTotalScore);
    updateBestResults(isNewPlayer, user, playerTotalScore);
    setIsGameFinished(true);
    setIsDangerStyled(true);
    console.log("Game is finished");
  }

  function resetValues() {
    mixedWords = mixWords(words);
    incorrectWords = [];
    playerTotalScore = 0;
    maxCombo = 0;
    correctNum = 0;
    correctRowNum = 0;
    incorrectNum = 0;
    incorrectRowNum = 0;
  }

  function restartGame() {
    resetValues();
    setBlinkKey(0);
    setDirection(null);
    setCurrentNum(0);
    setLeftSeconds(initTimeMap[level - 1]);
    setProgressValue(100);
    setIsTranslationShowed(false);
    setIsGamePaused(false);
    setIsGameFinished(false);
  }

  function changePlayer() {
    resetValues();
    handleReturnToHomePage();
  }

  return (
    <main className={isDangerStyled ? "game danger" : "game"}>
      {isGameFinished && (
        <ResultsModal
          user={user}
          totalScore={playerTotalScore}
          correctNum={correctNum}
          incorrectNum={incorrectNum}
          maxCombo={maxCombo}
        />
      )}
      {isGameFinished ? (
        <Results
          user={user}
          userDataObj={userDataObj}
          totalScore={playerTotalScore}
          correctNum={correctNum}
          incorrectNum={incorrectNum}
          maxCombo={maxCombo}
          gameWords={mixedWords}
          incorrectWords={incorrectWords}
          wordsNum={currentNum}
          existingPlayers={existingPlayers}
          // currentPlayerIndex={currentPlayerIndex}
          handleChangePlayer={changePlayer}
          handleRestartGame={restartGame}
        />
      ) : (
        <>
          {direction && (
            <BlinkingScore
              key={blinkKey}
              direction={direction}
              rowNum={correctRowNum || incorrectRowNum}
            />
          )}
          <Timer
            time={leftSeconds}
            isGamePaused={isGamePaused}
            handleTimeChange={changeTime}
            handleFinishGame={finishGame}
          />
          <ProgressBar currValue={progressValue} maxValue={100} />

          <Tooltips
            isGamePaused={isGamePaused}
            handleArrowStroke={handleCheckAnswer}
            handlePauseGame={pauseGame}
            handleResumeGame={resumeGame}
            handleAddTime={addTime}
            handleShowTranslation={showTranslation}
            handleSkipWord={changeWords}
          />
          <WordsBlock word1={currentWord.word1} word2={currentWord.word2} />
          {isTranslationShowed ? <Translation word={currentWord} /> : null}
          <Scores score={playerTotalScore} />
          <ButtonsBlock>
            <Button
              text="Yes"
              classes="success-button"
              onClick={() => checkAnswer(true, currentWord)}
            />
            <Button
              text="No"
              classes="failure-button"
              onClick={() => checkAnswer(false, currentWord)}
            />
          </ButtonsBlock>
        </>
      )}
    </main>
  );
}
