import { useGrades } from "hooks/Grade-Subject/useGrades";
import { useSubjects } from "hooks/Grade-Subject/useSubjects";
import { Chapter, ChapterDetail } from "models/matrix/Chapter";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import Select from "react-select";
import { chapterApi } from "services/api/matrix/chapter";
import { toastService } from "services/toast";
interface Props {
  show: boolean;
  chapter?: Chapter;
  setShow: (show: boolean) => void;
  onEditChapter?: (chapter: any) => void;
}
const EditChapterModal: React.FC<Props> = (props) => {
  const { show, setShow, onEditChapter, chapter } = props;
  const [loading, setLoading] = useState(false);
  const { grades } = useGrades();
  const { subjects } = useSubjects();

  const [chapterDetail, setChapter] = useState<ChapterDetail>(chapter as any);
  const handleCloseModal = () => {
    setShow(false);
  };
  const getDetailChapter = () => {
    if (chapter) {
      chapterApi.getById(chapter?.id).then((res) => {
        if (res.status === 200) {
          setChapter(res.data);
        }
      });
    }
  };
  useEffect(() => {
    getDetailChapter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter]);
  const handelOnShow = () => {};
  const handleUpdate = () => {
    const chapterUpate: Chapter = {
      id: chapterDetail.id,
      name: chapterDetail.name,
      subjectId: chapterDetail.subject.id,
      gradeId: chapterDetail.grade.id,
    };
    setLoading(true);
    chapterApi.updateChapter(chapterUpate).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        // toastService.success();
        onEditChapter && onEditChapter(res.data);
        handleCloseModal();
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
      {chapterDetail && (
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Tên Chương</Form.Label>
            <Form.Control
              type="text"
              placeholder="Tên tài liệu"
              spellCheck={false}
              value={chapterDetail.name}
              onChange={(e) =>
                setChapter({ ...chapterDetail, name: e.target.value })
              }
            />
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="ex" className="grade-value">
              <Form.Label>Lớp</Form.Label>
              <Select
                options={grades}
                value={chapterDetail.grade}
                getOptionLabel={(g) => g.name}
                getOptionValue={(g) => g.id}
                onChange={(e: any) =>
                  setChapter({ ...chapterDetail, grade: e })
                }
              />
            </Form.Group>

            <Form.Group as={Col} controlId="ex1">
              <Form.Label>Môn</Form.Label>
              <Select
                options={subjects}
                value={chapterDetail.subject}
                getOptionLabel={(s) => s.name}
                getOptionValue={(s) => s.id}
                onChange={(e: any) =>
                  setChapter({ ...chapterDetail, subject: e })
                }
              />
            </Form.Group>
          </Row>
        </Modal.Body>
      )}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Hủy
        </Button>
        <Button
          variant="primary"
          disabled={loading || (chapterDetail && chapterDetail?.name === "")}
          onClick={handleUpdate}
        >
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditChapterModal;
