import { useState, useRef, useEffect } from "react";
import iconPause from "../assets/images/icon_pause1.png";
import iconPlay from "../assets/images/icon_play.png";
import iconTime from "../assets/images/icon_time.png";
import iconInfo from "../assets/images/icon_info.png";
import iconCross from "../assets/images/icon_cross.png";
import Tooltip from "./Tooltip";
import SkipWordCount from "./SkipWordCount";

export default function Tooltips({
  isGamePaused,
  handleArrowStroke,
  handlePauseGame,
  handleResumeGame,
  handleAddTime,
  handleSkipWord,
  handleShowTranslation,
}) {
  const [isPauseAllowed, setIsPauseAllowed] = useState(true);
  const [isTranslated, setIsTranslated] = useState(false);
  const [isTimeAdded, setIsTimeAdded] = useState(false);
  const [skipWordCount, setSkipWordCount] = useState(3);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  function handleKeyDown(e) {
    e.preventDefault();

    if (e.key === "Enter") isGamePaused ? resumeGame() : pauseGame();
    if (e.code === "Space") showTranslation();
    if (e.code.includes("Shift")) addTime();
    if (e.code === "Escape") skipWord();
    if (e.code === "ArrowLeft") handleArrowStroke(true);
    if (e.code === "ArrowRight") handleArrowStroke(false);
  }

  function pauseGame() {
    handlePauseGame(isPauseAllowed);
  }

  function resumeGame() {
    handleResumeGame(isPauseAllowed);
    setIsPauseAllowed(false);
  }

  function addTime() {
    if (!isTimeAdded) handleAddTime();
    setIsTimeAdded(true);
  }

  function showTranslation() {
    handleShowTranslation(!isTranslated);
    setIsTranslated((prev) => !prev);
  }

  function skipWord() {
    if (skipWordCount > 0) {
      handleSkipWord();
      setSkipWordCount(skipWordCount - 1);
    }
  }

  return (
    <div
      className="tooltips"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      // onClick={onClick}
    >
      <Tooltip
        url={isGamePaused ? iconPlay : iconPause}
        onClick={isGamePaused ? resumeGame : pauseGame}
        title="pause/resume"
        classes={
          !isPauseAllowed && !isGamePaused
            ? "default"
            : isGamePaused
            ? "success"
            : ""
        }
      />
      <Tooltip
        url={iconTime}
        onClick={addTime}
        title="add time"
        classes={isTimeAdded ? "default" : ""}
      />
      <Tooltip
        url={iconInfo}
        onClick={showTranslation}
        title="show translation"
        classes={isTranslated ? "success" : ""}
      />
      <Tooltip
        url={iconCross}
        onClick={skipWord}
        title="skip word"
        classes={skipWordCount == 0 ? "default" : ""}
      />
      <SkipWordCount
        count={skipWordCount}
        classes={
          skipWordCount <= 1
            ? skipWordCount == 0
              ? "default"
              : "false"
            : "true"
        }
      />
    </div>
  );
}
