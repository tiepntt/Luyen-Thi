import TemplateKatex from "app/components/_share/TemplateKatex/TemplateKatex";
import React from "react";
interface Props {
  element: {
    type: string;
    content: string;
  };
  attributes: any;
  children: any;
}
const KatexElement: React.FC<Props> = ({ element, attributes, children }) => {
  return (
    <div className="d-inline-block" {...attributes}>
      <div className="d-inline-block" style={{userSelect :"none"}} contentEditable={false}>
        <TemplateKatex element={element} />
      </div>
      {children}
    </div>
  );
};

export default KatexElement;
