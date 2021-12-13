import React from "react";
import TemplatePreview from "..";
import "./style.scss";
interface Props {
  type: string;

  element: {
    align: any;
    children: [];
    ident?: number;
  };
}
const ParagraphPreview: React.FC<Props> = ({ element }) => {
  const { align, children, ident = 0 } = element;
  return (
    <div
      className="luyenthi-paragraph"
      style={{ textAlign: align || "left", textIndent: ident }}
    >
      {children.map((child, i) => (
        <TemplatePreview key={i} {...child} />
      ))}
    </div>
  );
};

export default ParagraphPreview;
