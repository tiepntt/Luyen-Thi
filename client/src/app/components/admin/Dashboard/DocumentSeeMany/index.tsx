import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const DocumentSeeMany = () => {
  return (
    <div>
      <DocumentItem />
      <DocumentItem />
      <DocumentItem />
      <DocumentItem />
      <DocumentItem />
    </div>
  );
};
const DocumentItem = () => {
  return (
    <div className="document-seen-item d-flex">
      <div className="label">
        <FontAwesomeIcon icon={faBook} className="mx-2" />
        <span>Đề thi THPT Quốc gia năm 2020</span>
      </div>
    </div>
  );
};
export default DocumentSeeMany;
