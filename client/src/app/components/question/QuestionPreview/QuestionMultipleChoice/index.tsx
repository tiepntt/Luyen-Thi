import TemplatePreview from "app/components/_share/TemplatePreview";
import { Question } from "models/question/Question";
import React, { createRef, useEffect, useState } from "react";
import { checkContentNull } from "utils/questionFunction";
import "./style.scss";
interface Props {
  question: Question;
  questionSetId: string;
}
const QuestionMultipleChocie: React.FC<Props> = ({
  questionSetId,
  question,
}) => {
  const { content = [], introduction = [], correctAnswer, solve } = question;
  const [optionsRef] = useState(createRef<HTMLDivElement>());
  const [boxRefs] = useState<any[]>(
    Array(content ? content.length : 0)
      .fill(null)
      .map(() => createRef())
  );
  const [scaleSize, setScaleSize] = useState<any>({});
  useEffect(() => {
    setTimeout(() => {
      let lengthMax = 0;
      let heightMax = 0;
      boxRefs.forEach((el) => {
        if (el.current) {
          lengthMax = Math.max(lengthMax, el.current?.clientWidth);
          heightMax = Math.max(heightMax, el.current?.clientHeight);
        }
      });

      const newScale = {} as any;
      newScale.width = lengthMax + 25;
      newScale.height = heightMax + 5;

      var optionBoxWidth = optionsRef.current?.clientWidth || 0;
      if (lengthMax < optionBoxWidth / 4 - 37) {
        newScale.width = optionBoxWidth / 4 - 9;
      } else if (lengthMax < optionBoxWidth / 2 - 37) {
        newScale.width = optionBoxWidth / 2 - 21;
      } else {
        newScale.width = optionBoxWidth - 25;
        newScale.height = "auto";
      }

      setScaleSize(newScale);
    }, 500);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, content);
  const getScale = () => ({
    width: scaleSize?.width || "auto",
    height: scaleSize?.height || "auto",
    minWidth: 100,
  });
  return (
    <div className="question-multiple-choice" id={`qid-${question.id}`}>
      <div className="question-introduction">
        {introduction &&
          introduction.map((element, i) => (
            <TemplatePreview key={i} {...element} />
          ))}
      </div>
      <div
        id={`qidotp-${question.id}`}
        className="question-options"
        ref={optionsRef}
      >
        {content &&
          content.map((option, i) => (
            <div
              className="option-item d-inline-flex"
              style={getScale()}
              ref={boxRefs[i]}
            >
              <div
                className={`name-option ${
                  correctAnswer === option.name && "correct-answer"
                }`}
              >
                {option.name}
              </div>
              <div className="content-option">
                {option.content.map((element, i_option) => (
                  <TemplatePreview key={i_option} {...element} />
                ))}
              </div>
            </div>
          ))}
      </div>
      {solve && solve.length && !checkContentNull(solve) && (
        <div className="solve-content">
          {solve.map((element, i) => (
            <TemplatePreview key={i} {...element} />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionMultipleChocie;
