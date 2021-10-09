import React from "react";
import { Image } from "react-bootstrap";
interface Props {
  element: {
    type: string;
    url: string;
  };
  attributes: any;
  children: any;
}
const ImageElement: React.FC<Props> = ({ element, attributes, children }) => {
  return (
    <div {...attributes}>
      <div className="d-inline-block" contentEditable={false}>
        <Image
          src={element.url}
          width={"auto"}
          height={"auto"}
          style={{
            maxWidth: "80%",
            maxHeight: 300,
          }}
        />
      </div>
      {children}
    </div>
  );
};

export default ImageElement;
