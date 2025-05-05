import { useEffect, useState, useRef } from "react";

export default function Timer({
  time,
  isGamePaused,
  handleTimeChange,
  handleFinishGame,
}) {
  const [remainingTime, setRemainingTime] = useState(time * 1000);

  // Sync state when 'time' prop changes
  useEffect(() => {
    setRemainingTime(time * 1000);
  }, [time]);

  // Start countdown
  useEffect(() => {
   const timeout = setInterval(() => {
      if (!isGamePaused) {
        setRemainingTime((prev) => {
          const updated = prev - 1000;
          handleTimeChange(updated);
          if (updated <= 0) {
            clearInterval(timeout);
            handleFinishGame();
            return 0;
          }
          return updated;
        });
      }
    }, 1000);

    return () => clearInterval(timeout);
  }, [isGamePaused]);
  // Only once when mounted - not effective now

  return (
    <div className={remainingTime === 0 ? "timer failure" : "timer"}>
      {Math.ceil(remainingTime / 1000)}
    </div>
  );
}
