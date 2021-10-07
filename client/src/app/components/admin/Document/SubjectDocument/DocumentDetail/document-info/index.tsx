import BoxApp from "app/components/_share/Box/Box";
import { useDocumentDetailContext } from "hooks/Document/DocumentDetailContext";
import { useGrades } from "hooks/Grade-Subject/useGrades";
import { useSubjects } from "hooks/Grade-Subject/useSubjects";
import { DocumentUpdateInfo } from "models/document/DocumentUpdateInfo";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import Select from "react-select";
import { documentApi } from "services/api/document/documentApi";
import { toastService } from "services/toast";
import { documentForms } from "settings/document/documentForm";
import { shuffleTypes } from "settings/document/documentShuffle";
import { documentStatuses } from "settings/document/documentStatus";
import { documentTypes } from "settings/document/documentType";
import { getIdFromUrl, IsGoogleDocUrl } from "utils/urlFunction";
import "./style.scss";
import { uploadApi } from "services/api/upload/uploadCloundinary";
import UploadImageForm from "app/components/_share/Form/UploadImage/UploadImageForm";
interface Props {
  documentId: string;
}
const DocumentEditInfo: React.FC<Props> = ({ documentId }) => {
  const { document, setQuestionSets } = useDocumentDetailContext();
  const [documentDetail, setDocumentDetail] = useState(document);
  const { grades } = useGrades();
  const { subjects } = useSubjects();
  const [updateEnable, setUpdateEnable] = useState(true);
  const importQuestionSet = () => {
    setUpdateEnable(false);
    const googleDocId = getIdFromUrl(documentDetail.googleDocId);
    documentApi
      .importQuestion({
        documentId: document.id,
        googleDocId,
        googleDocUrl: documentDetail.googleDocId,
      })
      .then((res: any) => {
        setUpdateEnable(true);
        if (res.status === 200) {
          toastService.success();
          setQuestionSets(res.data);
        } else {
          toastService.error(res.message);
        }
      });
  };
  const changeAvatar = (files: any) => {
    uploadApi.upload(files).then((res: any) => {
      if (res.status === 200) {
        const url = res.data.path;
        setDocumentDetail({ ...documentDetail, imageUrl: url });
      } else {
        toastService.error(res.message);
      }
    });
  };
  const updateDocument = () => {
    var documentUpdateInfo: DocumentUpdateInfo = {
      ...documentDetail,
      subjectId: documentDetail.subject.id,
      gradeId: documentDetail.grade.id,
      times: Math.abs(documentDetail.times) || 0,
    };
    setUpdateEnable(false);
    documentApi.update(documentUpdateInfo).then((res: any) => {
      setUpdateEnable(true);
      if (res.status === 200) {
        toastService.success("Đã lưu");
      } else {
        toastService.error(res.message);
      }
    });
  };
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
              </Form.Group>{" "}
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
              <div className=" document-options d-flex">
                <div className="image-document text-center">
                  <Image
                    src={
                      documentDetail.imageUrl ||
                      "https://ub.com.vn/attachments/ta-de-2009-1-png.28880/"
                    }
                    width={200}
                    height={250}
                  />
                  <div className="pos-absolute image-editor">
                    <UploadImageForm onUpload={changeAvatar} />
                  </div>
                </div>
                <div className="  matrix-document" style={{ flexGrow: 1 }}>
                  <Row className="row mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Thể loại</Form.Label>
                      <Select
                        options={documentTypes as any}
                        value={documentTypes.find(
                          (i) => i.value === documentDetail.documentType
                        )}
                        onChange={(e: any) =>
                          setDocumentDetail({
                            ...documentDetail,
                            documentType: e.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Chế độ người xem</Form.Label>
                      <Select
                        options={documentStatuses as any}
                        value={documentStatuses.find(
                          (i) => i.value === documentDetail.status
                        )}
                        onChange={(e: any) =>
                          setDocumentDetail({
                            ...documentDetail,
                            status: e.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Row>
                  <Row className="row mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Hình thức làm bài</Form.Label>
                      <Select
                        options={documentForms as any}
                        value={documentForms.find(
                          (i) => i.value === documentDetail.form
                        )}
                        onChange={(e: any) =>
                          setDocumentDetail({
                            ...documentDetail,
                            form: e.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Trộn câu hỏi</Form.Label>
                      <Select
                        options={shuffleTypes as any}
                        value={shuffleTypes.find(
                          (i) => i.value === documentDetail.shuffleType
                        )}
                        onChange={(e: any) =>
                          setDocumentDetail({
                            ...documentDetail,
                            shuffleType: e.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Row>
                  <Row className="row mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Thời gian làm bài (phút)</Form.Label>

                      <Form.Control
                        placeholder="số phút"
                        type="number"
                        min={0}
                        value={documentDetail.times}
                        onChange={(e) =>
                          setDocumentDetail({
                            ...documentDetail,
                            times: e.target.value as any,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Trạng thái</Form.Label>
                      <Form.Control
                        value={
                          documentDetail.isApprove ? "Đã duyệt" : "Chưa duyệt"
                        }
                        spellCheck={false}
                      />
                    </Form.Group>
                  </Row>
                </div>
              </div>
              <div className="btn-update text-right mt-4">
                <Button
                  className="mx-2"
                  variant="danger"
                  disabled={!updateEnable}
                >
                  Xóa
                </Button>
                <Button
                  className="mx-2"
                  variant="success"
                  disabled={!updateEnable}
                >
                  Duyệt
                </Button>

                <Button
                  className="mx-2"
                  variant="primary"
                  onClick={updateDocument}
                  disabled={!updateEnable}
                >
                  Lưu
                </Button>
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
                    value={documentDetail.googleDocId}
                    onChange={(e) =>
                      setDocumentDetail({
                        ...documentDetail,
                        googleDocId: e.target.value as any,
                      })
                    }
                    placeholder="đường dẫn tài liệu google doc (chế độ : mọi người có thể sửa)"
                  />
                </Form.Group>
                <div className="btn-update text-center">
                  <Button
                    className="mx-2"
                    variant="outline-warning"
                    href={`/document/${document.id}/questions-edit`}
                    target="_blank"
                  >
                    Sửa dữ liệu
                  </Button>
                  <Button
                    className="mx-2"
                    variant="outline-primary"
                    disabled={
                      !(
                        IsGoogleDocUrl(documentDetail.googleDocId) &&
                        updateEnable
                      )
                    }
                    onClick={importQuestionSet}
                  >
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
