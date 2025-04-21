export default function ProgressBar({ currValue, maxValue }) {
  return (
    <progress
      className="left-time-bar"
      value={currValue}
      max={maxValue}
    ></progress>
  );
}
