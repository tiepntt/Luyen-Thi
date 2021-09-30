import BoxApp from "app/components/_share/Box/Box";
import ImportQuestionSetModal from "app/components/_share/Modals/ImportQuestionSetModal/ImportQuestionSetModal";
import { QuestionSetDetail } from "models/questionSet/QuestionSetDetail";
import React, { useEffect, useState } from "react";
import { questionSetApi } from "services/api/document/questionSetApi";
import "./style.scss";
interface Props {
  documentId: string;
}
const QuestionDocument: React.FC<Props> = ({ documentId }) => {
  const [questionSets, setQuestionSets] = useState<QuestionSetDetail[]>();
  const [showModal, setShowModal] = useState(false);
  const getQuestionDocument = () => {
    questionSetApi.getByDocumentId(documentId).then((res) => {
      if (res.status === 200) {
        setQuestionSets(res.data);
      }
    });
  };
  useEffect(() => {
    getQuestionDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentId]);
  const onImportSuccess = (questionSets: QuestionSetDetail[]) => {
    setQuestionSets(questionSets);
  };
  const ImportQuestionSet = () => {
    return (
      <div className="question-set-import">
        <div className="question-notification">
          <span>Chưa có câu hỏi nào</span>
        </div>
        <div className="options-button">
          <div className="option-button create-question-set-button">
            Tạo bộ câu hỏi
          </div>
          <div
            className="option-button import-question-set-from-doc"
            onClick={() => setShowModal(true)}
          >
            Import từ GoogleDoc
          </div>
        </div>
      </div>
    );
  };
  return (
    <BoxApp>
      <div className="admin-document-questions">
        {questionSets && !questionSets.length && <ImportQuestionSet />}
        {questionSets && questionSets.map((questionSet, i) => <></>)}
      </div>
      <ImportQuestionSetModal
        documentId={documentId}
        show={showModal}
        setShow={setShowModal}
        onSuccess={onImportSuccess}
      />
    </BoxApp>
  );
};

export default QuestionDocument;
