import { Grid } from "@material-ui/core";
import ChapterItem from "app/components/matrix/chapter/chapterItem/ChapterItem";
import BoxApp from "app/components/_share/Box/Box";
import GradeDocumentBreadcubms from "app/components/_share/Breadcrumbs/GradeDocumentBreadcrubms/GradeDocumentBreadcubms";
import AddChapterModal from "app/components/_share/Modals/AddChapterModal/AddChapterModal";
import EditChapterModal from "app/components/_share/Modals/EditChapterModal/EditChapterModal";
import SubmitModal from "app/components/_share/Modals/SubmitModal/SubmitModal";
import { useChapters } from "hooks/Matrix/useChapters";
import { Chapter } from "models/matrix/Chapter";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { GradeApi } from "services/api/grade-subject/gradeApi";
import { SubjectApi } from "services/api/grade-subject/subecjtApi";
import "./style.scss";

interface Param {
  gradeId: string;
  subjectId: string;
}
const ChapterList = () => {
  const { gradeId, subjectId } = useParams<Param>();
  const grade = GradeApi.getGrade(gradeId);
  const subject = SubjectApi.getSubject(subjectId);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const {
    chapters,
    addChapter,
    currentChapter,
    setCurrentChappter,
    updateChapter,
    deleteChapter,
  } = useChapters(grade.id, subject.id);
  const params = [
    {
      title: "Tài liệu",
      href: "/admin/matrix",
    },
    {
      title: grade.name,
      href: `/admin/matrix/${grade.code}`,
    },
    {
      title: `${subject.name} - Chương trình đào tạo`,
      href: ``,
    },
  ];
  const showEditModal = (chapter: Chapter) => {
    setCurrentChappter(chapter);
    setShowModalEdit(true);
  };
  const showRemoveModal = (chapter: Chapter) => {
    setCurrentChappter(chapter);
    setShowModalRemove(true);
  };

  return (
    <div className="subject-matrix">
      <GradeDocumentBreadcubms
        params={params}
        showAddButton={true}
        showModalAdd={() => setShowModal(true)}
      />
      <div className="main-content-document">
        <Grid container>
          <Grid item xl={6} lg={8} xs={12} md={12}>
            <BoxApp>
              <div className="list-chapter">
                {chapters.map((chapter, i) => (
                  <ChapterItem
                    key={i}
                    chapter={chapter}
                    onEditClick={() => showEditModal(chapter)}
                    onRemoveClick={() => showRemoveModal(chapter)}
                  />
                ))}
              </div>
            </BoxApp>
          </Grid>
          <Grid item xl={6} lg={4} xs={12} md={12}></Grid>
        </Grid>
      </div>
      <AddChapterModal
        show={showModal}
        setShow={setShowModal}
        onAddChapter={addChapter}
        grade={grade}
        subject={subject}
      />
      <EditChapterModal
        show={showModalEdit}
        setShow={setShowModalEdit}
        chapter={currentChapter}
        onEditChapter={updateChapter}
      />
      <SubmitModal
        onSubmit={() => deleteChapter(currentChapter as any)}
        show={showModalRemove}
        setShow={setShowModalRemove}
      >
        <span>
          Xóa chương : <strong>{currentChapter?.name}</strong>
        </span>
      </SubmitModal>
    </div>
  );
};

export default ChapterList;
