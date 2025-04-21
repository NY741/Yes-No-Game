import { useState } from "react";

export default function Sentence({
  word,
  user,
  userDataObj,
  handleUpdateUser,
  handleIncorrectSentenceEntered
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [sentenceInput, setSentenceInput] = useState(word.sentence || "");

  console.log(word);
  console.log(userDataObj);

  function handleEditKeyDown(e) {
    if (e.key === "Enter") {
      saveSentence(word, e.target.value);
    }
  }

  function saveSentence(word, sentence) {
    if (checkWordUsage(word, sentence)) {
      const i = userDataObj.dictionary.findIndex((w) => w.word1 === word.word1);
      userDataObj.dictionary[i].sentence = sentence;
      localStorage.setItem(user, JSON.stringify(userDataObj));
      handleUpdateUser(userDataObj.dictionary);
      setIsEditing(false);
      console.log("Sentence saved");
    } else handleIncorrectSentenceEntered(word, sentence)
  }

  function checkWordUsage(word, sentence) {
    console.log(word);
    console.log(sentence);
    return sentence.toLowerCase().includes(word.word1);
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
    <span className="sentence-text"
      onClick={() => {
        setSentenceInput(word.sentence || "");
        setIsEditing(true);
      }}
    >
      {word.sentence || "Add sentence"}
    </span>
  );
}