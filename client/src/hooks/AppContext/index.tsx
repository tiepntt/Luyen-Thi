import { ChapterDetail } from "models/matrix/Chapter";
import { Grade } from "models/matrix/Grade";
import { LevelQuestion } from "models/matrix/Level";
import { Subject } from "models/matrix/Subject";
import React, { useContext } from "react";
export interface AppModels {
  showHeader: boolean;
  showFooter: boolean;
  setShowHeader: (value: boolean) => void;
  setShowFooter: (value: boolean) => void;
  scrollTop: (id?: string, position?: string) => void;
  grades: Grade[];
  subjects: Subject[];
  levels: LevelQuestion[];
  timeZone?: string;
  setSubjects: (subjects: Subject[]) => void;
  chapters: ChapterDetail[];
}
export const AppContext = React.createContext<AppModels>({} as AppModels);
export const useAppContext = () => useContext(AppContext);
