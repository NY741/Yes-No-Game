import { useRef } from "react";
import Button from "./Button";

export default function Description({ handleStartGame }) {
  const userName = useRef();
  const gameLevel = useRef();

  return (
    <section className="description">
      <h1 className="description__header">Yes or No Game</h1>
      <p className="description__text">
        Hi! This is a Yes-No game. You need to look at the words and their
        synonyms and guess if they were translated correctly, then click the
        appropriate button:
        <br />
        <br />
        <mark className="option">
          <mark>"Yes"</mark> if it is correct.
        </mark>
        <mark className="option">
          <mark>"No"</mark> if it is wrong.
        </mark>
        <br />
        The more correct answers you submit in a row, the more time you will
        receive as a bonus and the sooner you click the correct answer, the more
        points you will get and the more time will be added to your remaining
        game time. <br />
        <br />
        Moreover, you have 4 options that can help you to pass the game more
        successfully. They are:
        <br />
        <br />
        <mark className="option">Pause the game</mark>
        <mark className="option">Add more left time</mark>
        <mark className="option">Skip the words</mark>
        <mark className="option">Show the translation</mark>
        <br />
        You can pause the game only once, but you don't have a time limit,
        defining when you need to resume the game after you paused it. You can
        add a few seconds to your game only once whenever you need it. You can
        skip the word 3 times if you hesitate to choose the correct answer.
        Also, you can see the translation of the first word any time you want.
        <br />
        <br />
        You might as well use<mark> left ←</mark> and
        <mark> right → </mark>arrows instead if clicking "Yes" or "No" to choose
        if the word is correct or not.
        <br />
        <br />
        <mark>Good luck!</mark>
      </p>
      <form className="form">
        <div className="form__block">
          <label>Type your name: </label>
          <input
            ref={userName}
            defaultValue="Yusif"
            type="text"
            id="username"
            placeholder="Username"
            required
          />
        </div>
        <div className="form__block">
          <label>Choose your level: </label>
          <select
            ref={gameLevel}
            name="level"
            id="level"
            defaultValue="2"
            required
          >
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>
        </div>
      </form>
      <Button
        text="Start Game"
        classes="block-button"
        onClick={() =>
          handleStartGame(userName.current.value, gameLevel.current.value)
        }
      />
    </section>
  );
}
