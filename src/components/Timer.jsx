import { useEffect, useState, useRef } from "react";
import ProgressBar from "./ProgressBar";

export default function Timer({ timer, time, isGamePaused, handleFinishGame }) {
  const [remainingTime, setRemainingTime] = useState(time * 1000);
  const [progressValue, setProgressValue] = useState(100);

  // Sync state when 'time' prop changes
  useEffect(() => {
    setRemainingTime(time * 1000);
  }, [time]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("Interval running...");
  //     setRemainingTime((prev) => prev - 100);
  //   }, 100);

  //   return () => clearInterval(interval);
  // }, []);

  // Start countdown
  useEffect(() => {
    const timeout = setInterval(() => {
      if (!isGamePaused) {
        setRemainingTime((prev) => {
          let updatedTime = prev - 1000 ?? 0;
          changeTime(updatedTime);
          if (updatedTime <= 0) {
            clearInterval(timeout);
            handleFinishGame();
            return 0;
          }
          return updatedTime;
        });
      }
    }, 1000);

    return () => clearInterval(timeout);
  }, [isGamePaused]);
  // Only once when mounted - not effective now

  function changeTime(remainingTime) {
    if (remainingTime >= 0) {
      let value = (remainingTime / 1000 / timer) * 100;
      setProgressValue(value);
    }
  }

  return (
    <>
      <div className={remainingTime === 0 ? "timer failure" : "timer"}>
        {Math.ceil((remainingTime > 0 ? remainingTime : 0) / 1000)}
      </div>
      <ProgressBar currValue={progressValue} maxValue={100} />
    </>
  );
}
