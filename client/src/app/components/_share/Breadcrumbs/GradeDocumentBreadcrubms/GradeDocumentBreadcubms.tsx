import React from "react";
import { useHistory } from "react-router";
import "./style.scss";
interface Props {
  params?: Param[];
  showModalAdd?: any;
  showAddButton?: boolean;
}
const GradeDocumentBreadcubms: React.FC<Props> = ({
  params,
  showModalAdd,
  showAddButton,
}) => {
  const history = useHistory();
  const handleChangeParams = (param: Param) => {
    if (param.href) {
      history.push(param.href);
    }
  };
  return (
    <div className="grade-document-breadcrubms d-flex">
      <div className="d-flex" style={{ flexGrow: 1 }}>
        {params?.map(({ title, href }, i) => (
          <div className="param-item d-flex" key={i}>
            <div
              className="param-title"
              onClick={() => handleChangeParams({ title, href })}
            >
              {title}
            </div>
            {i < params.length - 1 && <span>/</span>}
          </div>
        ))}
      </div>
      <div className="option-btn">
        {showAddButton && (
          <div className="button-add-document" onClick={showModalAdd}>
            Thêm mới +
          </div>
        )}
      </div>
    </div>
  );
};

export default GradeDocumentBreadcubms;
interface Param {
  title: string;
  href: string;
}
