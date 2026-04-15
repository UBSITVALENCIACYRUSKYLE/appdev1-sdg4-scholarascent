export interface User {
    id: number;
    username: string;
    rank: string;
    currentExp: number;
    totalExp: number;
    completedLessons: number[];
  }