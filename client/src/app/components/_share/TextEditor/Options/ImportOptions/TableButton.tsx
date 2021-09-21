import { faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSlateStatic } from "slate-react";
import { insertTabletAtIndex } from "../../Elements/TableElement/withTables";

const TableButton = () => {
  const editor = useSlateStatic();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectionActive, setSelectionActive] = useState(null);
  const [tableInfo, setTableInfo] = useState({
    row: 0,
    colum: 0,
  });
  const handleClick = (event: any) => {
    setSelectionActive(editor.selection as any);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const insertTable = (row: number, col: number) => {
    insertTabletAtIndex(editor as any, row, col, selectionActive);
    console.log("abc");

    handleClose();
    // setDocument && setDocument([...document, table]);
    // setSelection && setSelection(editor);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <div className={`button-option-editor `} onClick={handleClick}>
        <FontAwesomeIcon icon={faTable} />
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography sx={{ p: 2 }}>
          <div className="table-item-editor">
            {Array(8)
              .fill(null)
              .map((_, indexRow) => (
                <div className="table-row-item-list-editor">
                  {Array(8)
                    .fill(null)
                    .map((_, indexCol) => (
                      <div
                        className={`table-cell-item-list-editor ${
                          indexRow < tableInfo.row &&
                          indexCol < tableInfo.colum &&
                          "active"
                        }`}
                        onMouseOver={() =>
                          setTableInfo({
                            row: indexRow + 1,
                            colum: indexCol + 1,
                          })
                        }
                        onClick={() => insertTable(indexRow + 1, indexCol + 1)}
                      ></div>
                    ))}
                </div>
              ))}
          </div>
        </Typography>
      </Popover>
    </>
  );
};

export default TableButton;
