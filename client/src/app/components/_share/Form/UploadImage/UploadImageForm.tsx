import React from "react";
import ImageUploader from "react-images-upload";

interface Props {
  onUpload: (value: any) => void;
}
const UploadImageForm: React.FC<Props> = (props) => {
  const { onUpload } = props;
  const onDrop = (img: any[], pictureDataURLs: any) => {
    if (onUpload) {
      onUpload(img.pop());
      // addImg(img;
    }
  };
  return (
    <div className="upload">
      <ImageUploader
        withIcon={false}
        withLabel={false}
        buttonText="Chọn ảnh"
        onChange={onDrop}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />
    </div>
  );
};

export default UploadImageForm;
