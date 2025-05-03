import { useRef, useImperativeHandle, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

export default function ResultsModal({ user, totalScore }) {
  const [isOpen, setIsOpen] = useState(true);
  const dialog = useRef();
  const result = totalScore > 0 ? true : false;

  function handleSubmit() {
    console.log("Worked");
    setIsOpen(false);
  }

  return createPortal(
    <div className={isOpen ? "manual-backdrop" : undefined}>
      <dialog ref={dialog} className="result-modal" open={true}>
        <h2 className="white-text">Game Over!</h2>
        <p>
          Player: <mark>{user}</mark>
        </p>
        <p>
          Score: <mark>{totalScore}</mark>
        </p>
        <form method="dialog" onSubmit={handleSubmit}>
          <Button text={"Got it!"} />
        </form>
      </dialog>
    </div>,
    document.getElementById("modal")
  );
}
