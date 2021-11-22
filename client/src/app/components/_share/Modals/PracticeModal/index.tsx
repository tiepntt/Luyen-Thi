import QuestionPractice from "app/components/question/QuestionPractice";
import {
  HistoriesQuestionModel,
  HistoryQuestions,
} from "hooks/Question/historyQuestionExam";
import { useQuestionPractice } from "hooks/Question/useQuestionHistory";
import { PracticeConfig } from "models/practice/practiceConfig";
import React, { useEffect } from "react";
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
    setShow(false);
  };
  const {
    question,
    histories,
    generateQuestion,
    answerQuestionIndex,
    setAnswerIndex,
  } = useQuestionPractice(config);
  const value: HistoriesQuestionModel = {
    questionHistories: histories,
    disable: false,
    canShowSolve: false,
    setQuestionHistoryIndex: setAnswerIndex,
    userAnswerIndex: answerQuestionIndex as any,
    getSolve: null as any,
  };
  useEffect(() => {
    if (show && config) {
      generateQuestion();
    }
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
      <Modal.Body className="p-3">
        <SnipperLayout loading={question}>
          <div className="question-content">
            <HistoryQuestions.Provider value={value}>
              <QuestionPractice question={question} />
            </HistoryQuestions.Provider>
          </div>
        </SnipperLayout>
      </Modal.Body>
      <Modal.Footer>
        <BsLightbulb color="black" size={30} />
        <Button className="check-answer" disabled variant="primary">Kiểm tra</Button>
        <BsArrowRightCircleFill color="#00FFCC" size={30} />
      </Modal.Footer>
    </Modal>
  );
};

export default PracticeModal;
