import { useState } from "react";

export default function Sentence({
  word,
  user,
  userDataObj,
  handleUpdateUser,
  handleIncorrectEntry,
  handleIncorrectLength,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [sentenceInput, setSentenceInput] = useState(word.sentence || "");

  function handleEditKeyDown(e) {
    if (e.key === "Enter") {
      saveSentence(word, e.target.value);
    }
  }

  function saveSentence(word, sentence) {
    if (checkLength(sentence)) {
      if (checkWordUsage(word, sentence)) {
        const i = userDataObj.dictionary.findIndex(
          (w) => w.word1 === word.word1
        );
        sentence = sentence.trim().toLowerCase();
        console.log(i);
        console.log(userDataObj.dictionary[i]);
        userDataObj.dictionary[i].sentence = sentence;
        localStorage.setItem(user, JSON.stringify(userDataObj));
        handleUpdateUser(userDataObj.dictionary);
        setIsEditing(false);
        console.log("Sentence saved");
      } else {
        handleIncorrectEntry(word.word1);
        setSentenceInput("");
        setIsEditing(false);
      }
    } else {
      handleIncorrectLength(sentence);
      setSentenceInput("");
      setIsEditing(false);
    }
  }

  function checkWordUsage(word, sentence) {
    return sentence.toLowerCase().includes(word.word1);
  }

  function checkLength(sentence) {
    return sentence.trim().split(" ").length > 1;
  }

  return isEditing ? (
    <input
      type="text"
      value={sentenceInput}
      onChange={(e) => setSentenceInput(e.target.value)}
      onKeyDown={(e) => handleEditKeyDown(e)}
      onBlur={(e) => saveSentence(word, e.target.value)}
    />
  ) : (
    <span
      className={word.sentence ? "sentence-text" : "fallback-text"}
      onClick={() => {
        setSentenceInput(word.sentence || "");
        setIsEditing(true);
      }}
    >
      {word.sentence || "Add sentence"}
    </span>
  );
}
