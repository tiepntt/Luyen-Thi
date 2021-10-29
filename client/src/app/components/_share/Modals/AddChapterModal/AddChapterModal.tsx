import { ChapterCreate } from "models/matrix/Chapter";
import { Grade } from "models/matrix/Grade";
import { Subject } from "models/matrix/Subject";
import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { chapterApi } from "services/api/matrix/chapter";
import { toastService } from "services/toast";

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
  grade: Grade;
  subject: Subject;
  onAddChapter?: (chapter: any) => void;
}
const AddChapterModal: React.FC<Props> = (props) => {
  const { show, grade, setShow, subject, onAddChapter } = props;
  const [loading, setLoading] = useState(false);
  const [chapter, setChapter] = useState<ChapterCreate>({
    name: "",
    gradeId: grade.id,
    subjectId: subject.id,
  });
  const handleCloseModal = () => {
    setShow(false);
  };
  const handelOnShow = () => {
    setChapter({
      name: "",
      gradeId: grade.id,
      subjectId: subject.id,
    });
  };
  const handleClickAddButton = () => {
    addChapter();
  };
  const addChapter = () => {
    setLoading(true);
    chapterApi.addChapter(chapter).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        onAddChapter && onAddChapter(res.data);
        handleCloseModal();
        // toastService.success();
      } else {
        toastService.error();
      }
    });
  };
  return (
    <Modal show={show} onHide={handleCloseModal} onShow={handelOnShow} centered>
      <Modal.Header>
        <Modal.Title>Thêm chương mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Tên Chương</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tên tài liệu"
            spellCheck={false}
            value={chapter.name}
            onChange={(e) => setChapter({ ...chapter, name: e.target.value })}
          />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="ex" className="grade-value">
            <Form.Label>Lớp</Form.Label>
            <Form.Control type="text" value={grade.name} disabled />
          </Form.Group>

          <Form.Group as={Col} controlId="ex1">
            <Form.Label>Môn</Form.Label>
            <Form.Control type="text" value={subject.name} disabled />
          </Form.Group>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Hủy
        </Button>
        <Button
          variant="primary"
          disabled={chapter.name === "" || loading}
          onClick={handleClickAddButton}
        >
          Thêm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddChapterModal;
