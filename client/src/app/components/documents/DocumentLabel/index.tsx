import {
  faChevronRight,
  faEye,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Image } from "react-bootstrap";
import "./style.scss";
interface Props {}
const DocumentLabel: React.FC<Props> = (props) => {
  return (
    <div className="document-label">
      <div className="props-img">
        <Image src={url} className="document-avatar" thumbnail />
        <div className="icon-seen">
          <FontAwesomeIcon icon={faEye} />
          <span>100</span>
        </div>
      </div>
      <div className="info">
        <div className="document-item-title">
          Đề thi thử THPT Quốc gia năm 2021 môn toán trường THPT Chu văn An -
          Thái Bình
        </div>
        <div className="desription">
          Đề thi năm trong bộ đề thi thử đợt 3 của sở GD và ĐT Thanh Hoá
        </div>
        <div className="d-flex document-type-date d-flex">
          <div className="document-type" style={{ flexGrow: 1 }}>
            Đề thi thử
          </div>
          <div className="date">
            <span>22 / 09 / 2021</span>
          </div>
        </div>
        <div className="d-flex document-options">
          <div className="button-do" style={{ flexGrow: 1 }}>
            <Button size="sm">
              Làm ngay
              <span>
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </Button>
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faHeart} size={"lg"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentLabel;
const url =
  "https://onthiielts.com.vn/wp-content/uploads/2021/07/dap-an-de-thi-thpt-quoc-gia-mon-toan-2021.jpg";
