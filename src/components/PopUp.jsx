import MarkedText from "./MarkedText";

export default function PopUp({ type, word }) {
  let text;
  let isSuccess;

  switch (type) {
    case "add":
      isSuccess = true;
      text = (
        <>
          The word <MarkedText type={isSuccess}>{word}</MarkedText> added to the
          dictionary
        </>
      );
      break;
    case "add-incorrect":
      isSuccess = true;
      text = (
        <>
          <MarkedText type={isSuccess}>{word}</MarkedText> are added to the
          dictionary
        </>
      );
      break;
    case "remove":
      isSuccess = false;
      text = (
        <>
          The word <MarkedText type={isSuccess}>{word}</MarkedText> removed from
          the dictionary
        </>
      );
      break;
    case "learn":
      isSuccess = true;
      text = (
        <>
          The word <MarkedText type={isSuccess}>{word}</MarkedText> marked as
          learned
        </>
      );
      break;
    case "duplicate":
      isSuccess = false;
      text = (
        <>
          The word <MarkedText type={isSuccess}>{word}</MarkedText> already
          exists in the dictionary
        </>
      );
      break;
    case "incorrect-entry":
      isSuccess = false;
      text = (
        <>
          Entered sentence does not contain the word{" "}
          <MarkedText type={isSuccess}>{word}</MarkedText>
        </>
      );
      break;
    case "incorrect-length":
      isSuccess = false;
      text = (
        <>
          Entered text - <MarkedText type={isSuccess}>{word}</MarkedText> - is
          not a phrase or sentence
        </>
      );
      break;
    default:
      break;
  }

  return (
    <div className="pop-up">
      <p className={`pop-up__text ${isSuccess ? "success" : "failure"}-text`}>
        {text}
      </p>
    </div>
  );
}
