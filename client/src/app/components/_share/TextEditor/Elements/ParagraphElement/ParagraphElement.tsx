import React from "react";
import { AlignType } from "../../_utils";
interface Props {
  element: {
    align: AlignType;
  };
  attributes: any;
  children: any;
  align: AlignType;
}
const ParagraphElement: React.FC<Props> = ({
  element,
  attributes,
  children,
  align,
}) => {
  return (
    <div
      style={{ marginBottom: 0, textAlign: element.align || align || "left" }}
      {...attributes}
    >
      {children}
    </div>
  );
};

export default ParagraphElement;
