export default function MarkedText({ type, children }) {
  return (
    <mark className={type === "success" ? "true" : "false"}>
      {children}
    </mark>
  );
}
