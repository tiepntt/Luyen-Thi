import React from "react";
interface Props {
  element: {
    text: string;
    italic?: boolean;
    underline?: boolean;
    bold?: boolean;
  };
}
const TextPreview: React.FC<Props> = ({ element }) => {
  const { text, italic, underline, bold } = element;
  return (
    <span
      className="luyenthi-text"
      style={{
        fontStyle: italic ? "italic" : "unset",
        fontWeight: bold ? "bold" : "unset",
        textDecoration: underline ? "underline" : "unset",
      }}
    >
      {text}
    </span>
  );
};

export default TextPreview;
