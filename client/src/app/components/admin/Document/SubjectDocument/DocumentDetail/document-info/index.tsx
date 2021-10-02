import BoxApp from "app/components/_share/Box/Box";
import { useDocumentDetailContext } from "hooks/Document/DocumentDetailContext";
import { useGrades } from "hooks/Grade-Subject/useGrades";
import { useSubjects } from "hooks/Grade-Subject/useSubjects";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import Select from "react-select";
import "./style.scss";
interface Props {
  documentId: string;
}
const DocumentEditInfo: React.FC<Props> = ({ documentId }) => {
  const { document } = useDocumentDetailContext();
  const [documentDetail, setDocumentDetail] = useState(document);
  const { grades } = useGrades();
  const { subjects } = useSubjects();
  useEffect(() => {
    setDocumentDetail(document);
  }, [document]);
  return (
    <BoxApp>
      <div className="document-edit-info">
        <div className="document-info-preview">
          <div className="label-document">THÔNG TIN TÀI LIỆU</div>
          {documentDetail && (
            <div className="document-info mt-3">
              <Form.Group className="mb-3">
                <Form.Label className="font-weight-bold">
                  Tên tài liệu
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="VD : Đề thi thử THPT QG năm 2020 sở GD Thái Bình"
                  value={documentDetail.name}
                  spellCheck={false}
                  onChange={(e) =>
                    setDocumentDetail({
                      ...documentDetail,
                      name: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="font-weight-bold">Mô tả</Form.Label>
                <Form.Control
                  className="document-description"
                  as="textarea"
                  rows={6}
                  value={documentDetail.description}
                  spellCheck={false}
                  onChange={(e) =>
                    setDocumentDetail({
                      ...documentDetail,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <div className=" document-options d-flex">
                <div className="image-document text-center">
                  <Image
                    src="https://ub.com.vn/attachments/ta-de-2009-1-png.28880/"
                    width={200}
                    height={250}
                  />
                </div>
                <div className="  matrix-document" style={{ flexGrow: 1 }}>
                  <Row className="row mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Lớp</Form.Label>
                      <Select
                        options={grades}
                        value={documentDetail.grade}
                        getOptionLabel={(e) => e.name}
                        getOptionValue={(e) => e.id as any}
                        onChange={(e: any) =>
                          setDocumentDetail({
                            ...documentDetail,
                            grade: e,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Môn</Form.Label>
                      <Select
                        options={subjects}
                        value={documentDetail.subject}
                        getOptionLabel={(e) => e.name}
                        getOptionValue={(e) => e.id as any}
                        onChange={(e: any) =>
                          setDocumentDetail({ ...documentDetail, subject: e })
                        }
                      />
                    </Form.Group>
                  </Row>
                  <Row className="row mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Lớp</Form.Label>
                      <Select
                        options={grades}
                        value={documentDetail.grade}
                        getOptionLabel={(e) => e.name}
                        getOptionValue={(e) => e.id as any}
                        onChange={(e: any) =>
                          setDocumentDetail({
                            ...documentDetail,
                            grade: e,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Môn</Form.Label>
                      <Select
                        options={subjects}
                        value={documentDetail.subject}
                        getOptionLabel={(e) => e.name}
                        getOptionValue={(e) => e.id as any}
                        onChange={(e: any) =>
                          setDocumentDetail({ ...documentDetail, subject: e })
                        }
                      />
                    </Form.Group>
                  </Row>
                  <Row className="row mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Lớp</Form.Label>
                      <Select
                        options={grades}
                        value={documentDetail.grade}
                        getOptionLabel={(e) => e.name}
                        getOptionValue={(e) => e.id as any}
                        onChange={(e: any) =>
                          setDocumentDetail({
                            ...documentDetail,
                            grade: e,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Môn</Form.Label>
                      <Select
                        options={subjects}
                        value={documentDetail.subject}
                        getOptionLabel={(e) => e.name}
                        getOptionValue={(e) => e.id as any}
                        onChange={(e: any) =>
                          setDocumentDetail({ ...documentDetail, subject: e })
                        }
                      />
                    </Form.Group>
                  </Row>
                </div>
              </div>
              <div className="btn-update text-right mt-4">
                <Button className="mx-2" variant="danger">
                  Xóa
                </Button>
                <Button variant="primary">Lưu</Button>
              </div>
              <hr className="mt-4" />
              <div className="update-data">
                <Form.Group className="mb-3">
                  <Form.Label className="font-weight-bold">
                    Cập nhật dữ liệu
                  </Form.Label>
                  <Form.Control
                    className="document-google-doc"
                    spellCheck={false}
                    placeholder="đường dẫn tài liệu google doc (chế độ : mọi người có thể sửa)"
                  />
                </Form.Group>
                <div className="btn-update text-center">
                  <Button className="mx-2" variant="outline-warning">
                    Sửa dữ liệu
                  </Button>
                  <Button className="mx-2" variant="outline-primary">
                    Cập nhật
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </BoxApp>
  );
};

export default DocumentEditInfo;
