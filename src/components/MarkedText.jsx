export default function MarkedText({ type, children }) {
  return (
    <mark className={type ? "true" : "false"}>
      {children}
    </mark>
  );
}
