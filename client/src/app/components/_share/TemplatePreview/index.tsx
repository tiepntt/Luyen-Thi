import React from "react";
import ImagePreview from "./Image";
import KatexPreview from "./Katex";
import ParagraphPreview from "./Paragraph";
import TablePreview from "./Table";
import TextPreview from "./Text";
const elements = {
  image: ImagePreview,
  paragraph: ParagraphPreview,
  katex: KatexPreview,
  table: TablePreview,
  text: TextPreview,
};

interface Props {
  type?: string;
}
const TemplatePreview: React.FC<Props> = (element) => {
  const { type = "text" } = element;
  return (
    <>
      {React.createElement((elements as any)[type], {
        element: { ...element },
      })}
    </>
  );
};

export default TemplatePreview;
