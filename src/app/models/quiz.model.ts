export interface QuizQuestion {
    id: number;
    lessonId: number;
    question: string;
    choices: string[];
    correctIndex: number;
    expReward: number;
  }