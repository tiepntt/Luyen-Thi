import React from "react";
import "./style.scss";
import ClockIcon from "assets/images/document/Clock.png";
import { Button, Image } from "react-bootstrap";
import { QuestionHistory } from "models/question/QuestionHistory";
import { DocumentHistory } from "models/document/DocumentHistory";
import { TimeFunction } from "utils/timeFunction";
import { QuestionHistoryStatus } from "settings/question/questionHistoryStatus";
interface Props {
  documentHistory?: DocumentHistory;
  times: number;
}
const DocumentExamSidebar: React.FC<Props> = ({
  documentHistory,
  times = 0,
}) => {
  const scrollIntoView = (id: string) => {
    try {
      const element = document.getElementById(`qid-${id}`);
      element &&
        element.scrollIntoView({
          block: "center",
          inline: "center",
          behavior: "smooth",
        });
    } catch {}
  };
  const getClassIndexQuestion = (question: QuestionHistory) => {
    let classNameIndex = question.answer ? "has-answer" : "";
    switch (question.status) {
      case QuestionHistoryStatus.Correct:
        classNameIndex += "correct";
        break;
      case QuestionHistoryStatus.Incorrect:
        classNameIndex += "incorrect";
        break;
      case QuestionHistoryStatus.Temp:
        break;
    }
    return classNameIndex;
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
        <Button className="btn-submit">Nộp bài</Button>
      </div>
    </div>
  );
};

export default DocumentExamSidebar;
