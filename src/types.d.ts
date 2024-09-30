declare module "*.module.css";

interface ImportMeta {
  env: {
    VITE_OPENAI_API_KEY: string;
  };
}

type Difficulty = "상" | "중" | "하";
type QuizNum = "5" | "10" | "15";
type QuizType = "객관식" | "빈칸 채우기" | "OX 퀴즈" | "랜덤";

interface CardProps {
  topic: string;
}

type QuizOption = {
  // card: CardProps;
  topic: string;
  quizType: QuizType;
  difficulty: Difficulty;
  quizNum: QuizNum;
};

interface Quiz {
  question: string;
  options: string[];
  answer: string;
}
interface QuizResponse {
  MultipleQuestion: Quiz[];
}
interface TopicType {
  id: number;
  title: string;
  "background-color": string;
  icon: string;
  isIconBlack: boolean;
  discription: string;
}
