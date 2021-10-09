import QuestionSetPreview from "app/components/question-set/QuestionSetPreview";
import BoxApp from "app/components/_share/Box/Box";
import Loading from "app/components/_share/StaticLayout/Loading";
import ImportQuestionSetModal from "app/components/_share/Modals/ImportQuestionSetModal/ImportQuestionSetModal";
import { QuestionSetDetail } from "models/questionSet/QuestionSetDetail";
import React, { useState } from "react";
import "./style.scss";
interface Props {
  documentId: string;
  questionSets?: QuestionSetDetail[];
  setQuestionSets: (value: any) => void;
  loading?: boolean;
}
const QuestionDocument: React.FC<Props> = ({
  documentId,
  questionSets,
  setQuestionSets,
  loading = false,
}) => {
  const [showModal, setShowModal] = useState(false);

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
        <div className="preview-document-question">
          <div className="label-document">DỮ LIỆU CÂU HỎI</div>
          {!loading ? (
            questionSets && (
              <div className="question-document">
                {!questionSets.length ? (
                  <ImportQuestionSet />
                ) : (
                  questionSets.map((questionSet, i) => (
                    <QuestionSetPreview key={i} data={questionSet} />
                  ))
                )}
              </div>
            )
          ) : (
            <Loading />
          )}
        </div>
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
