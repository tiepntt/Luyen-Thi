import { Grade } from "./Grade";

export interface Subject {
  id: string;
  code: string;
  name: string;
  total?: number;
  grades?: Grade[];
  templateId?: string;
  avatarUrl?: string;
}
