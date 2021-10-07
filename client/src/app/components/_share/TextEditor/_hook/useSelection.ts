import { useState } from "react";
import areEqual from "deep-equal";
interface Props {
  selection: any;
}
const useSelection = (editor: Props) => {
  const [selection, setSelection] = useState(null);
  const setSelectionOptimized = (newSelection: any) => {
    // don't update the component state if selection hasn't changed.

    if (areEqual(selection, newSelection)) {
      return;
    }
    setSelection(newSelection);
  };

  return [selection, setSelectionOptimized];
};

export default useSelection;
