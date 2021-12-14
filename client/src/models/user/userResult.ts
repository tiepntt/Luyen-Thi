export interface UserResultAnalyticQuery {
  gradeCode?: string;
  subjectCode?: string;
  userId?: string;
  timeZone?: string;
}
export interface UserHistoryAnalyticQuery {
  userId?: string;
  type: UserHistoryTypeTime;
  timeZone?: string;
}
export enum UserHistoryTypeTime {
  Today,
  InWeek,
  InMonth,
  InYear,
}

export interface UserResultAnalytic {
  totalTime: number;
  medium: number;
  maxScore: number;
  numberDocument: number;
  percentCorrect: number;
}
export interface UserHistoryAnalytic {
  label: string;
  maxScore: number;
  total: number;
  timeDuration: number;
  startTime: Date;
  endTime: Date;
  medium: number;
}
export interface AnalyticActionUserModal {
  title: string;
  quality: number;
}