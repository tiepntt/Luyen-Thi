import { AnalyticChapter, ChapterDetail } from "models/matrix/Chapter";
import React from "react";
import { Table, Button } from "react-bootstrap";
import SnipperLayout from "../../Layouts/SpinnerLayout";

interface Props {
  chapter: ChapterDetail[];
  resultChapter: AnalyticChapter[];
  codeSubject: string;
}
const UserAnalyticResultInSubject: React.FC<Props> = ({
  chapter,
  resultChapter,
  codeSubject,
}) => {
  return (
    <div className="user-analytic-chart mx-2 mt-2 mb-2">
      <SnipperLayout loading={chapter && resultChapter}>
        <Table bordered hover>
          <thead>
            <tr className="text-center">
              <th>
                <div style={{ maxWidth: 500 }}>Chương</div>
              </th>
              <th>Câu đúng</th>
              <th>Đã làm</th>
              <th>Tổng số</th>
              <th>Vào luyện tập</th>
            </tr>
          </thead>
          <tbody>
            {chapter.map((el, i) => {
              const chapterResult = resultChapter.find(
                (i) => i.chapterId === el.id
              );
              return (
                <tr>
                  <td>{el.name}</td>
                  <td className="text-center">
                    {chapterResult?.questionCorrectQuantily || 0}
                  </td>
                  <td className="text-center">
                    {chapterResult?.questionQuantily || 0}
                  </td>
                  <td className="text-center">
                    {chapterResult?.questionTotal || 0}
                  </td>
                  <td className="text-center">
                    <Button
                      variant="outline-info"
                      href={`/practice/${codeSubject}/checkpoint?section=chapter-${i}`}
                    >
                      Luyện tập
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </SnipperLayout>
    </div>
  );
};

export default UserAnalyticResultInSubject;
