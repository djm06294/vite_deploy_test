import { create } from "zustand";
import "./types.d.ts"; // Quiz, QuizOption 등의 타입이 정의된 파일을 임포트

interface QuizState {
  quizzes: Quiz[]; // 상태 타입 명시
  setQuiz: (data: Quiz[]) => void; // 상태 변경 함수 타입 명시
  removeQuiz: () => void;
}

interface QuizSetting {
  quizOption: QuizOption;
  setTopic: (topic_: string) => void;
  setType: (quizType_: QuizType) => void;
  setDiff: (difficulty_: Difficulty) => void;
  setNum: (quizNum_: QuizNum) => void;
  resetQuizOption: () => void; // 초기 상태로 돌려놓는 함수
}

// Quiz 관련 상태 저장소
const useQuiz = create<QuizState>((set) => ({
  quizzes: [],
  setQuiz: (data: Quiz[]) => set(() => ({ quizzes: data })),
  removeQuiz: () => set({ quizzes: [] }),
}));

// Quiz 옵션 관련 상태 저장소
const useQuizOption = create<QuizSetting>((set) => ({
  quizOption: {
    topic: "",
    quizType: "객관식",
    difficulty: "중",
    quizNum: "10",
  },
  setTopic: (topic_: string) =>
    set((state) => ({ quizOption: { ...state.quizOption, topic: topic_ } })),

  setType: (quizType_: QuizType) =>
    set((state) => ({
      quizOption: { ...state.quizOption, quizType: quizType_ },
    })),

  setDiff: (difficulty_: Difficulty) =>
    set((state) => ({
      quizOption: { ...state.quizOption, difficulty: difficulty_ },
    })),

  setNum: (quizNum_: QuizNum) =>
    set((state) => ({
      quizOption: { ...state.quizOption, quizNum: quizNum_ },
    })),
  resetQuizOption: () =>
    set(() => ({
      quizOption: {
        topic: "",
        quizType: "객관식",
        difficulty: "중",
        quizNum: "10",
      }, // 초기 상태로 되돌리기
    })),
}));

export default useQuiz;
export { useQuizOption };
