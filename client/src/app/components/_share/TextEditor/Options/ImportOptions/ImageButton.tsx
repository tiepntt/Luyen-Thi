import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSlateStatic } from "slate-react";
import { insertImage, isImageUrl } from "../../Elements/ImageElement/withImage";

const ImageButton = () => {
  const editor = useSlateStatic();
  const onMouseDown = (event: any) => {
    event.preventDefault();
    const url = window.prompt("Enter the URL of the image:");
    if (!url || !isImageUrl(url)) {
      alert("URL is not an image");
      return;
    }
    insertImage(editor as any, url as any);
  };
  return (
    <div className={`button-option-editor `} onMouseDown={onMouseDown}>
      <FontAwesomeIcon icon={faImage} />
    </div>
  );
};

export default ImageButton;
