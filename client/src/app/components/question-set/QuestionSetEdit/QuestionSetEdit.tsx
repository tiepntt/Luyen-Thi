import { QuestionSetDetail } from "models/questionSet/QuestionSetDetail";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import { questionSetApi } from "services/api/document/questionSetApi";
import { toastService } from "services/toast";
import Select from "react-select";
import "./style.scss";
import { questionSetShows } from "settings/question-set/questionSetShows";
import QuestionSetPreview from "../QuestionSetPreview";
import Loading from "app/components/_share/StaticLayout/Loading";
import { useDocumentEditContext } from "hooks/DocumentEditQuestionContext/DocumentEditContext";
import NoData from "app/components/_share/StaticLayout/NoData";

const QuestionSetEdit = () => {
  const { questionSetId } = useParams<any>();
  const [questionSet, setQuestionSet] = useState<QuestionSetDetail>();
  const { updateQuestionSet, removeQuestionSet } = useDocumentEditContext();
  const history = useHistory();
  useEffect(() => {
    setQuestionSet(null as any);
    questionSetApi.getDetail(questionSetId).then((res) => {
      if (res.status === 200) {
        setQuestionSet(res.data);
      } else {
        toastService.error(res.data.message);
      }
    });
  }, [questionSetId]);
  const update = () => {
    questionSetApi
      .update({
        id: questionSet?.id,
        name: questionSet?.name,
        show: questionSet?.show,
      } as any)
      .then((res) => {
        if (res.status === 200) {
          toastService.success("Đã lưu");
          updateQuestionSet(res.data);
        } else {
          toastService.error(res.data.message);
        }
      });
  };
  const remove = () => {
    let confirm = window.confirm("Bạn muốn xóa phần câu hỏi này");
    if (confirm) {
      questionSetApi.remove(questionSetId).then((res) => {
        if (res.status === 200) {
          toastService.success("Đã xóa");
          history.push(`/editor/document/${questionSet?.documentId}`);
          removeQuestionSet(questionSetId);
          return;
        } else {
          toastService.error(res.data.message);
        }
      });
    }
  };
  return (
    <div className="question-set-edit">
      {questionSet ? (
        <div className="question-set-info-edit">
          <Form.Group>
            <Form.Label>Tiêu đề phần</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={questionSet.name}
              onChange={(e) =>
                setQuestionSet({ ...questionSet, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Trạng thái</Form.Label>
            <Select
              options={questionSetShows as any}
              value={questionSetShows.find((i) => i.value === questionSet.show)}
              onChange={(e: any) =>
                setQuestionSet({ ...questionSet, show: e.value })
              }
            />
          </Form.Group>
          <div className="option-btn mt-3 text-center">
            <div className="d-inline-block">
              <Button
                className="mx-5"
                variant="outline-danger"
                onClick={remove}
              >
                Xóa
              </Button>
              <Button
                className="mx-5"
                variant="outline-primary"
                onClick={update}
              >
                Lưu
              </Button>
            </div>
          </div>
          <hr />
          {questionSet.questions && questionSet.questions.length ? (
            <div className="questions-set-preview mt-3">
              <div className="label text-center">Dữ liệu câu hỏi</div>
              <QuestionSetPreview data={questionSet} />
            </div>
          ) : (
            <NoData />
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default QuestionSetEdit;
