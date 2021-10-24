import React from "react";
import "./style.scss";
import ClockIcon from "assets/images/document/Clock.png";
import { Button, Image } from "react-bootstrap";
import { QuestionHistory } from "models/question/QuestionHistory";
import { DocumentHistory } from "models/document/DocumentHistory";
import { TimeFunction } from "utils/timeFunction";
import { DocumentHistoryStatus } from "settings/document/documentHistory";
import { getClassStatusQuestion } from "utils/questionFunction";
interface Props {
  documentHistory?: DocumentHistory;
  times: number;
  onSubmit: () => void;
  onReset: () => void;
}
const DocumentExamSidebar: React.FC<Props> = ({
  documentHistory,
  times = 0,
  onSubmit,
  onReset,
}) => {
  const scrollIntoView = (id: string) => {
    try {
      const element = document.getElementById(`qid-${id}`);
      element &&
        element.scrollIntoView({
          block: "start",
          inline: "center",
          behavior: "smooth",
        });
    } catch {}
  };
  const getClassIndexQuestion = (question: QuestionHistory) => {
    let classNameIndex = question.answer ? "has-answer" : "";
    return `${classNameIndex} ${getClassStatusQuestion(question)}`;
  };
  return (
    <div id="document-exam-sidebar">
      <div className="time-block d-flex">
        <div className="label">
          <Image src={ClockIcon as any} width={48} height={48} />
        </div>
        <div className="time-run text-center w-100" style={{ flexGrow: 1 }}>
          {TimeFunction.convertSeconds(times)}
        </div>
      </div>
      <div className="index-list">
        <div className="question-index-list">
          {documentHistory?.questionHistories &&
            documentHistory?.questionHistories.map((question, i) => (
              <div
                key={i}
                className={`question-index-item ${getClassIndexQuestion(
                  question
                )}`}
                onClick={() => scrollIntoView(question.questionId)}
              >
                {1 + i}
              </div>
            ))}
        </div>
      </div>
      <div className="btn-option">
        {documentHistory?.status !== DocumentHistoryStatus.Close ? (
          <Button
            className="btn-submit"
            onClick={onSubmit}
            disabled={documentHistory?.status !== DocumentHistoryStatus.Doing}
          >
            Nộp bài
          </Button>
        ) : (
          <Button className="btn-submit" onClick={onReset}>
            Làm lại
          </Button>
        )}
      </div>
    </div>
  );
};

export default DocumentExamSidebar;
