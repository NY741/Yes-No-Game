export default function skipWordCount({ count, classes }) {
  let className = "skip-index";
  className += ` ${classes}`;
  return <span className={className}>{count}</span>;
}
