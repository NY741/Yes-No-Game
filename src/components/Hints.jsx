import { useState } from "react";
import iconPause from "../assets/images/icon_play.png";
import iconTime from "../assets/images/icon_time.png";
import iconInfo from "../assets/images/icon_info.png";
import iconCross from "../assets/images/icon_cross.png";
import Hint from "./Hint";
import SkipWordCount from "./SkipWordCount";

let classesSkipWordCount = "";

export default function Hints({ handleAddTimeHint, handleShowTranslationHint }) {
  const [skipWordCount, setSkipWordCount] = useState(3);

  function handleSkipWordHint() {
    if (skipWordCount > 0) {
      console.log("Word skipped");
      setSkipWordCount(skipWordCount - 1);
      if (skipWordCount == 1) classesSkipWordCount = "false";
      // changeWords();
    }
    if (skipWordCount === 0) {
      // hintSkipWord.removeEventListener("click", addTimeHint);
      classesSkipWordCount = "default";
    }
    console.log(skipWordCount);
  }

  return (
    <div className="hints">
      <Hint url={iconPause} title="pause/resume" />
      <Hint url={iconTime} onClick={handleAddTimeHint} title="add time" />
      <Hint
        url={iconInfo}
        onClick={handleShowTranslationHint}
        title="show translation"
      />
      <Hint url={iconCross} onClick={handleSkipWordHint} title="skip word" />
      <SkipWordCount count={skipWordCount} classes={classesSkipWordCount} />
    </div>
  );
}
