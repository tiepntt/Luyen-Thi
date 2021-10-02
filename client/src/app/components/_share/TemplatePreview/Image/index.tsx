import React from "react";
import { Image } from "react-bootstrap";
interface Props {
  element: {
    url: string;
    width: number;
    height: number;
  };
}
const ImagePreview: React.FC<Props> = ({ element }) => {
  const { url, width = 400, height = 300 } = element;

  return (
    <div className="luyenthi-img d-inline-block">
      <Image src={url} width={width} height={height} />
    </div>
  );
};

export default ImagePreview;
