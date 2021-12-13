import QuestionPractice from "app/components/question/QuestionPractice";
import {
  HistoriesQuestionModel,
  HistoryQuestions,
} from "hooks/Question/historyQuestionExam";
import { useQuestionPractice } from "hooks/Question/useQuestionHistory";
import { PracticeConfig } from "models/practice/practiceConfig";
import React, { useEffect, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import SnipperLayout from "../../Layouts/SpinnerLayout";
import { BsArrowRightCircleFill, BsLightbulb } from "react-icons/bs";
import "./style.scss";
interface Props {
  show: boolean;
  setShow: (value: boolean) => void;
  config: PracticeConfig;
}
const PracticeModal: React.FC<Props> = ({ show, setShow, config }) => {
  const handleClose = () => {
    clearQuestion();
    setShow(false);
  };
  const {
    question,
    histories,
    generateQuestion,
    answerQuestionIndex,
    setAnswerIndex,
    submitQuestion,
    disable,
    getNextQuestion,
    getSolve,
    showSolve,
    clearQuestion,
  } = useQuestionPractice(config);

  const value: HistoriesQuestionModel = {
    questionHistories: histories,
    disable,
    canShowSolve: showSolve,
    setQuestionHistoryIndex: setAnswerIndex,
    userAnswerIndex: answerQuestionIndex as any,
    getSolve: null as any,
  };
  useEffect(() => {
    if (show && config) {
      generateQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, show]);
  return (
    <Modal
      animation
      show={show}
      onHide={handleClose}
      centered
      className="modal-show-mark pb-5"
      size="lg"
      //   backdrop="static"
    >
      <Modal.Header></Modal.Header>
      <Modal.Body className="p-3 question-modal">
        <SnipperLayout loading={question}>
          <div className="question-content">
            <HistoryQuestions.Provider value={value}>
              <QuestionPractice question={question} />
            </HistoryQuestions.Provider>
          </div>
        </SnipperLayout>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <BsLightbulb color="black" size={30} onClick={getSolve} />
        <Button
          className="check-answer"
          disabled={histories.some((s) => !s.answer)}
          variant="primary"
          onClick={submitQuestion}
        >
          Kiểm tra
        </Button>
        <BsArrowRightCircleFill
          color="#00FFCC"
          size={30}
          onClick={getNextQuestion}
          className="next-question"
        />
      </Modal.Footer>
    </Modal>
  );
};

export default PracticeModal;
