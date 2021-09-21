import React from "react";
interface Props {
  attributes: any;
  children: any;
  element: any;
}
const TableElement: React.FC<Props> = ({ attributes, children }) => {
  return (
    <table className="table-editor table-bordered">
      <tbody {...attributes}>{children}</tbody>
    </table>
  );
};

export const TableRow: React.FC<Props> = ({ attributes, children }) => {
  return (
    <tr className="table-row-editor" {...attributes}>
      {children}
    </tr>
  );
};
interface PropsTableCell {
  attributes: any;
  children: any;
  element: {
    columnSpan?: number;
    rowSpan?: number;
  };
}
export const TableCell: React.FC<PropsTableCell> = ({
  attributes,
  children,
  element,
}) => {
  return (
    <td
      className="table-cell-editor"
      {...attributes}
      colSpan={element.columnSpan || 1}
      rowSpan={element.rowSpan || 1}
    >
      {children}
    </td>
  );
};

export default TableElement;
