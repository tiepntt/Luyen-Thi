import { TemplateLevelGenerate } from "./template-level-generate";

export interface TemplateQuestionGenerate {
  id: string;
  gradeId: string;
  chapterId: string;
  unitId: string;
  templateQuestionId: string;
  templateLevelGenarates: TemplateLevelGenerate[];
}
