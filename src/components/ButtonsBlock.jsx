import { addClasses } from "../functions";

export default function ButtonsBlock({ children, classes }) {
  let className = addClasses('buttons', classes);

  return <div className={className}>{children}</div>;
}
