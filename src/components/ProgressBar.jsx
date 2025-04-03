export default function ProgressBar({ currValue, maxValue }) {
  console.log(currValue);
  return (
    <progress
      className="left-time-bar"
      value={currValue}
      max={maxValue}
    ></progress>
  );
}
