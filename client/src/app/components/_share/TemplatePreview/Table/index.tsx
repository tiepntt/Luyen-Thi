import React from "react";
import TemplatePreview from "..";
import "./style.scss";
interface Props {
  element: {
    children: []; // row
  };
}
const TablePreview: React.FC<Props> = ({ element }) => {
  const { children = [] } = element;
  return (
    <table className="lt-table table-bordered">
      <tbody>
        {children.map((child, index) => (
          <TableRow {...child} key={index} />
        ))}
      </tbody>
    </table>
  );
};
interface TableRowProps {
  children: [];
}
export const TableRow: React.FC<TableRowProps> = ({ children }) => {
  return (
    <tr className="lt-table-row">
      {children.map((child, index) => (
        <TableCell {...child} key={index} />
      ))}
    </tr>
  );
};
interface PropsTableCell {
  columnSpan?: number;
  rowSpan?: number;
  children: [];
}
export const TableCell: React.FC<PropsTableCell> = ({
  children,
  columnSpan,
  rowSpan,
}) => {
  return (
    <td
      className="lt-table-cell"
      colSpan={columnSpan || 1}
      rowSpan={rowSpan || 1}
    >
      {children.map((child, i) => (
        <TemplatePreview {...child} key={i} />
      ))}
    </td>
  );
};

export default TablePreview;
