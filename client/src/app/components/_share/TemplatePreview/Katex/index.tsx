import React from "react";
import TemplateKatex from "../../TemplateKatex";
interface Props {
  element: {
    content: string;
  };
}
const KatexPreview: React.FC<Props> = ({ element }) => {
  return <TemplateKatex element={element} />;
};

export default KatexPreview;
