import { useEffect, useState } from "react";

export default function BlinkingScore({ direction, rowNum }) {
  const [displayed, setDisplayed] = useState(true);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setDisplayed(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }, []);

  // console.log(direction, rowNum);
  return (
    displayed && (
      <div
        className={
          direction === "increase" ? "score-increase" : "score-decrease"
        }
      >
        {direction === "increase" ? `+${rowNum}` : `-${rowNum}`}
      </div>
    )
  );
}
