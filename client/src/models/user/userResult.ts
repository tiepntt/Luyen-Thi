export interface UserResultAnalyticQuery {
  gradeCode?: string;
  subjectCode?: string;
  userId?: string;
}
export interface UserHistoryAnalyticQuery {
  userId?: string;
  type: UserHistoryTypeTime;
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
