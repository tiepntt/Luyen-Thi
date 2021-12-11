import React from "react";
import { Container } from "react-bootstrap";
import DocumentBreadcumbs from "../../Breadcrumbs/AppBreadcumbs";
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
      title: "Tài liệu",
      href: "/document",
    },
    {
      title: document?.name || "",
      href: `/document/${document?.id}/preview`,
    },
  ];
  const documentHistory = document?.documentHistory;
  const scrore = documentHistory
    ? ((documentHistory.numberCorrect || 0) / (document?.numberQuestion || 1)) *
      10
    : 0;

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
                  text={`${documentHistory?.numberCorrect || 0}/${
                    document?.numberQuestion || 40
                  }`}
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
                  text={`${scrore.toFixed(2)}/10`}
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
                  text={`${
                    Math.round((documentHistory?.timeDuration || 0) * 10) / 10
                  }/${document?.times || 0}`}
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
