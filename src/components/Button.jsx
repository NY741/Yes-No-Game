import { addClasses } from "../functions";

export default function Button({ text, classes, onClick }) {
  let className = addClasses(classes);

  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
}
