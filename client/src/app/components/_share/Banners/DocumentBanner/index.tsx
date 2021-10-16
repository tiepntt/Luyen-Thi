import React from "react";
import { Container } from "react-bootstrap";
import DocumentBreadcumbs from "../../Breadcrumbs/DocumentBreadcumbs";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "./style.scss";
import { DocumentPreview } from "models/document/DocumentPreview";
interface Props {
  document?: DocumentPreview;
}
const DocumentBanner: React.FC<Props> = ({ document }) => {
  const params = [
    {
      title: "Trang chủ",
      href: "/",
    },
    {
      title: "Đề thi",
      href: "/",
    },
    {
      title: document?.name || "",
      href: "/",
    },
  ];

  return (
    <div className="document-banner pb-3">
      <div className="top-banner">
        <Container>
          <div className="p-3">
            <DocumentBreadcumbs
              params={params}
              className="document-banner-breadcrumbs"
            />
          </div>
        </Container>
      </div>
      <div className="main-banner">
        <Container>
          <div className="row p-3">
            <div className="col-xl-7">
              <h2 className="document-name">{document?.name}</h2>
              <div className="desciption">{document?.description}</div>
            </div>
            <div className="progess-document col-xl-5 text-center ">
              <div className="block-process d-inline-block mx-3">
                <CircularProgressbar
                  value={100}
                  text={`0/${document?.numberQuestion || 40}`}
                  className="progress-item"
                  strokeWidth={5}
                  styles={buildStyles({
                    textColor: "green",
                    pathColor: "turquoise",
                    trailColor: "gold",
                  })}
                />
                <div className="label">Câu</div>
              </div>
              <div className="block-process d-inline-block mx-3">
                <CircularProgressbar
                  value={100}
                  text={`9.75/10`}
                  className="progress-item"
                  strokeWidth={5}
                  styles={buildStyles({
                    textColor: "green",
                    pathColor: "turquoise",
                    trailColor: "gold",
                  })}
                />
                <div className="label">Điểm</div>
              </div>
              <div className="block-process d-inline-block mx-3">
                <CircularProgressbar
                  value={100}
                  text={`0/${document?.times || 0}`}
                  className="progress-item"
                  strokeWidth={5}
                  styles={buildStyles({
                    textColor: "green",
                    pathColor: "turquoise",
                    trailColor: "gold",
                  })}
                />
                <div className="label">Phút</div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default DocumentBanner;
