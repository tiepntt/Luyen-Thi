import React from "react";
import { Image } from "react-bootstrap";
import "./style.scss";
interface Props {
  element: {
    url: string;
    width: number;
    height: number;
  };
}
const ImagePreview: React.FC<Props> = ({ element }) => {
  const { url, width, height } = element;

  return (
    <div className="luyenthi-img d-inline-block">
      <Image
        src={url}
        width={width || "auto"}
        height={height || "auto"}
        style={{ maxHeight: 300, maxWidth: "80%" }}
      />
    </div>
  );
};

export default ImagePreview;
