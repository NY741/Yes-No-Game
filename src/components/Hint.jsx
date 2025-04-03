export default function Hint({ url, title, classes, onClick }) {
  let className = "image-button";
  className += ` ${classes}`;
  return <img className={className} src={url} alt={title} onClick={onClick}/>;
}
