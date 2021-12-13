import React, { useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import "./style.scss";
interface Props {
  onSelect?: (item: any) => void;
  input?: { name?: string }[];
  onChange?: (e: string) => void;
  placeHolder?: string;
  inputValue: string;
}

export const SearchFilterInput = (props: Props) => {
  const { onSelect, input, onChange, placeHolder, inputValue } = props;
  const [value, setValue] = React.useState({
    name: "",
  });
  useEffect(() => {
    setValue({ name: inputValue });
  }, [inputValue]);
  return (
    <Autocomplete
      className="auto-complete"
      value={value}
      fullWidth
      onKeyUp={(e: any) => {
        if (onChange) onChange(e.target?.value);
      }}
      onKeyPress={(e: any) => {
        if (e.key === "Enter") {
          if (onSelect) onSelect(e.target?.value);
        }
      }}
      onChange={(event: any, newValue: any) => {
        if (onSelect && newValue) {
          onSelect(newValue || event.target?.value);
        }

        if (typeof newValue === "string") {
          setValue({
            name: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          setValue({
            name: newValue.inputValue,
          });
        } else {
          setValue(newValue);
        }
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={input || []}
      getOptionLabel={(option: any) => {
        if (typeof option === "string") {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.name;
      }}
      clearOnEscape
      // renderOption={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeHolder}
          variant="outlined"
          value={inputValue}
        />
      )}
    />
  );
};
