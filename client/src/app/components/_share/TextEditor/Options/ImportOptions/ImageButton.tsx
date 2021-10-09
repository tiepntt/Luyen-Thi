import React, { useState } from "react";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";
import { useSlateStatic } from "slate-react";
import { insertImage, isImageUrl } from "../../Elements/ImageElement/withImage";
import { uploadApi } from "services/api/upload/uploadCloundinary";
import { toastService } from "services/toast";

const ImageButton = () => {
  const [uploading, setUploading] = useState(false);

  const editor = useSlateStatic();

  const onChange = (e: any) => {
    setUploading(true);
    console.log(e.target.files);
    uploadApi.uploadQuestion(e.target.files[0]).then((res) => {
      setUploading(false);
      if (res.status === 200) {
        insertImage(editor as any, res.data.path as any);
      } else {
        toastService.error(res.data.message);
      }
    });
  };
  return (
    <div className={`button-option-editor `}>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>
          <FontAwesomeIcon icon={faImage} />
        </Form.Label>
        {!uploading && (
          <Form.Control
            type="file"
            hidden
            name="input-file"
            accept="image/*"
            onInput={onChange}
            multiple={false}
          />
        )}
      </Form.Group>
    </div>
    // </div>
  );
};

export default ImageButton;
