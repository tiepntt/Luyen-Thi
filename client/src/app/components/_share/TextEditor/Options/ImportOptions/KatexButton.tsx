import { Button, Dialog, DialogActions, DialogContent, DialogContentText, Slide } from "@material-ui/core";
import InputMathQuil from "app/components/_share/Quil";
import TemplateKatex from "app/components/_share/TemplateKatex/TemplateKatex";
import React, { useEffect, useState } from "react";
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
  const [actionSave, setActionSave] = React.useState(false);
  const [selection, setSelection] = useState(null);
  const [value, setValueKatex] = useState("x^2+ 3x + 5 = 2x^2+ 6x^3 - 7 + x");
  const handleClickOpen = () => {
    setSelection(editor.selection as any);
    setOpen(true);
    setActionSave(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (actionSave) {
      saveKatex();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionSave]);
  const saveKatex = () => {
    if (value) {
      insertKaTextAtIndex(
        editor as any,
        `$${value.replaceAll("\\frac", "\\dfrac")}$`,
        selection
      );
    }
    handleClose();
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
              <InputMathQuil
                defaultValue={value}
                onChange={setValueKatex}
                onEnter={() => setActionSave(true)}
              />
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
