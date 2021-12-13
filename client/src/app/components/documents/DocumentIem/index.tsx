import BoxApp from "app/components/_share/Box";
import { DocumentTitle } from "models/document/DocumentTitle";
import moment from "moment";
import React from "react";
import { Image } from "react-bootstrap";
import "./style.scss";
interface Props {
  document: DocumentTitle;
  onClick: () => void;
}
const DocumentItem: React.FC<Props> = ({ document, onClick }) => {
  return (
    <BoxApp>
      <div className="document-item d-flex">
        <div className="image-document">
          <Image
            src={document.imageUrl || url}
            className="apartment-avatar"
            thumbnail
            height={200}
          />
        </div>
        <div className="document-info" style={{ flexGrow: 1 }}>
          <div className="title-document" onClick={onClick}>
            {document.name}
          </div>
          <div className="document-description">{document.description}</div>
          <div className="document-view-response d-flex">
            <div className="details">
              <div className="number-do">
                Số lượt làm bài : <span>100</span>
              </div>
              <div className="date-create">
                Ngày tạo : {moment(document?.createdAt).format("DD/MM/yyyy")}
              </div>
            </div>
            <div className="status-document"></div>
          </div>
        </div>
      </div>
    </BoxApp>
  );
};

export default DocumentItem;
const url =
  "https://taiphanmem.com.vn/anhphanmem/20210520/dethieng2-2021-05-20.png";
