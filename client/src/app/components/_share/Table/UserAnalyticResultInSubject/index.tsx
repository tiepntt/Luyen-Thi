import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";

interface Props {
  chapter: any[];
  resultChapter: any[];
  codeSubject: string;
}
const UserAnalyticResultInSubject: React.FC<Props> = ({
  chapter,
  resultChapter,
  codeSubject,
}) => {
  const [resultAllChapter, setResultAllChapter] = useState(
    chapter.map((el) =>
      resultChapter.find(
        (analyticChapter) => analyticChapter.chapterId === el.id
      )
    )
  );
  useEffect(() => {
    setResultAllChapter(
      chapter.map((el) =>
        resultChapter.find(
          (analyticChapter) => analyticChapter.chapterId === el.id
        )
      )
    );
  }, [chapter, resultChapter]);

  return (
    <div className="user-analytic-chart mx-2 my-5">
      <Table bordered hover>
        <thead>
          <tr className="text-center">
            <th>
              <div>Chương</div>
            </th>
            <th>Số câu đúng</th>
            <th>Số câu đã làm</th>
            <th>Tổng số câu</th>
            <th>Vào luyện tập</th>
          </tr>
        </thead>
        <tbody>
          {chapter.map((el, i) => (
            <tr>
              <td>{el.name}</td>
              <td className="text-center">
                {resultAllChapter[i]?.questionCorrectQuantily
                  ? resultAllChapter[i]?.questionCorrectQuantily
                  : 0}
              </td>
              <td className="text-center">
                {resultAllChapter[i]?.questionQuantily
                  ? resultAllChapter[i]?.questionQuantily
                  : 0}
              </td>
              <td className="text-center">
                {resultAllChapter[i]?.questionTotal
                  ? resultAllChapter[i]?.questionTotal
                  : 0}
              </td>
              <td className="text-center">
                <Button
                  variant="outline-info"
                  href={`/practice/${codeSubject}/checkpoint`}
                >
                  Luyện tập
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserAnalyticResultInSubject;
