// import { useEffect, useState } from "react";
import MarkedText from "./MarkedText";

export default function PopUp({ type, word }) {
  let text;
  let isSuccess;
  console.log(type);
  console.log(word);

  switch (type) {
    case "add":
      text = (
        <>
          The word <MarkedText type="success">{word}</MarkedText> added to the
          dictionary
        </>
      );
      isSuccess = true;
      break;
    case "add-incorrect":
      text = (
        <>
          <MarkedText type="success">All incorrect</MarkedText> words are added
          to the dictionary
        </>
      );
      isSuccess = true;
      break;
    case "remove":
      text = (
        <>
          The word <MarkedText type="failure">{word}</MarkedText> removed from
          the dictionary
        </>
      );
      isSuccess = false;
      break;
    case "duplicate":
      text = (
        <>
          The word <MarkedText type="failure">{word}</MarkedText> already exists
          in the dictionary
        </>
      );
      isSuccess = false;
      break;
    case "incorrect-entry":
      text = (
        <>
          Entered sentence does not contain the word <MarkedText type="failure">{word}</MarkedText>
        </>
      );
      isSuccess = false;
      break;

    default:
      break;
  }

  return (
    <div className="pop-up">
      <p
        className={
          isSuccess ? "pop-up__text success-text" : "pop-up__text failure-text"
        }
      >
        {text}
      </p>
    </div>
  );
}
