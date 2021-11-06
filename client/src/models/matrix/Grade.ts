import { Subject } from "./Subject";

export interface Grade {
  id: string;
  code: string;
  name: string;
  total?: number;
  subjects?: Subject[];
}
