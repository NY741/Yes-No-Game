export default function MarkedText({ type, children }) {
  return (
    <mark className={type === "success" ? "success" : "failure"}>
      {children}
    </mark>
  );
}
