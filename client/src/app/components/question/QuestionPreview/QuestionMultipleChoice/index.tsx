import TemplatePreview from "app/components/_share/TemplatePreview";
import { Question } from "models/question/Question";
import React, { createRef, useEffect, useState } from "react";
import "./style.scss";

const QuestionMultipleChocie: React.FC<Question> = (question) => {
  const { content = [], introduction = [], correctAnswer } = question;
  const [optionsRef] = useState(createRef<HTMLDivElement>());
  const [boxRefs] = useState<any[]>(
    Array(content.length)
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
      }

      setScaleSize(newScale);
    }, 500);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, content);
  const getScale = () => ({
    width: scaleSize?.width || "auto",
    height: "auto",
    minWidth: 100,
  });
  return (
    <div className="question-multiple-choice" id={`qid-${question.id}`}>
      <div className="question-introduction">
        {introduction.map((element, i) => (
          <TemplatePreview key={i} {...element} />
        ))}
      </div>
      <div
        id={`qidotp-${question.id}`}
        className="question-options"
        ref={optionsRef}
      >
        {content.map((option, i) => (
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
    </div>
  );
};

export default QuestionMultipleChocie;
