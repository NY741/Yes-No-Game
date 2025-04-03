export default function WordsBlock({ word1, word2 }) {
  return (
    <div className="words-block">
      <span className="game__word first-word">{word1}</span>
      <span className="game__word second-word">{word2}</span>
    </div>
  );
}
