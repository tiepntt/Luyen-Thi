import React from "react";
import TemplatePreview from "..";
interface Props {
  type: string;
  element: {
    align: any;
    children: [];
  };
}
const ParagraphPreview: React.FC<Props> = ({ element }) => {
  const { align, children } = element;
  return (
    <div className="luyenthi-paragraph" style={{ textAlign: align || "left" }}>
      {children.map((child, i) => (
        <TemplatePreview key={i} {...child} />
      ))}
    </div>
  );
};

export default ParagraphPreview;
