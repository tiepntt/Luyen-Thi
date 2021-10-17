import { MenuItem } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import React, { useState } from "react";

interface Props {
  value?: any;
  input?: {
    id?: any;
    code?: string;
    name?: string;
    label?: string;
    value?: any;
  }[];
  onSelect?: (e?: any) => void;
  onClear?: (e: any) => void;
  label?: string;
  labelId?: string;
  inputBootstrap?: any;
  id?: any;
  getValue?: string;
}

export const DropDownInput = (props: Props) => {
  const [selected, setSelected] = useState(false);
  const {
    value,
    input,
    onSelect,
    label,
    inputBootstrap,
    id,
    labelId,
    getValue = "id",
  } = props;
  const onSelectItem = (e: any) => {
    if (onSelect) {
      if (e.target.value !== -1) onSelect(e.target.value);
      else onSelect(undefined);
    }
  };
  const getLabel = () => {
    if (!value || !selected)
      return (
        <MenuItem disabled value={0}>
          {label}
        </MenuItem>
      );
  };
  return (
    <Select
      onMouseMove={() => setSelected(true)}
      onClick={onSelectItem}
      className={"drop-down"}
      value={value || 0}
      input={inputBootstrap}
      id={id}
      fullWidth
      labelId={labelId}
    >
      {getLabel()}
      <MenuItem value={-1}>{"Tất cả"}</MenuItem>
      {input?.map((item, index) => (
        <MenuItem
          value={
            (item as any)[getValue] ||
            item.id ||
            item.code ||
            item.value ||
            index
          }
        >
          {item.name || item.label}
        </MenuItem>
      ))}
    </Select>
  );
};
