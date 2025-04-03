import { useEffect, useState } from "react";

export default function Timer({ time, handleTimeChange }) {
  const [remainingTime, setRemainingTime] = useState(time * 1000);

  useEffect(() => {
    console.log("works");
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1000);
      console.log(remainingTime);
      handleTimeChange(remainingTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [remainingTime]);

  return <div className="timer">{remainingTime / 1000}</div>;
}
