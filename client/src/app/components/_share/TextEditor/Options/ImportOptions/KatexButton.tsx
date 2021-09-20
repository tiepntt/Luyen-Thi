import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
} from "@mui/material";
import InputMathQuil from "app/components/_share/Quil";
import TemplateKatex from "app/components/_share/TemplateKatex/TemplateKatex";
import React, { useState } from "react";
import "reactjs-popup/dist/index.css";
import { useSlateStatic } from "slate-react";
import { insertKaTextAtIndex } from "../../Elements/KatexElement/WithKatex";
const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
      children={props.children as any}
    />
  );
});

const KatexButton = () => {
  const editor = useSlateStatic();
  const [open, setOpen] = React.useState(false);
  const [selection, setSelection] = useState(null);
  const [value, setValue] = useState("x^2+ 3x + 5 = 2x^2+ 6x^3 - 7 + x");
  const handleClickOpen = () => {
    setSelection(editor.selection as any);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const saveKatex = () => {
    handleClose();
    insertKaTextAtIndex(
      editor as any,
      `$${value.replaceAll("\\frac", "\\dfrac")}$`,
      selection
    );
  };

  return (
    <>
      <div className={`button-option-editor `} onMouseDown={handleClickOpen}>
        <TemplateKatex element={{ content: "$fx$" }} />
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition as any}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className="input-math-quil">
              <InputMathQuil defaultValue={value} onChange={setValue} />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Hủy
          </Button>
          <Button onClick={saveKatex} variant="contained">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default KatexButton;
