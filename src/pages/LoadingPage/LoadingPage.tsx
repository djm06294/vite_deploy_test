import { useEffect } from "react";
import fetchQuiz from "../../api.ts";
import { useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";

import useQuiz from "../../quiz_zustand.ts";
import { useQuizOption } from "../../quiz_zustand.ts";
import "../../types.d.ts";

export default function LoadingPage() {
  const { quizzes, setQuiz } = useQuiz((state) => state);
  const { quizOption, resetQuizOption } = useQuizOption((state) => state);
  const navigate = useNavigate();

  const getQuiz = async () => {
    try {
      console.log("final", quizOption);
      const data: QuizResponse = await fetchQuiz(quizOption);
      resetQuizOption();

      setQuiz(data.MultipleQuestion);
      console.log("quizzes", quizzes);
      return true;
    } catch (e) {
      console.log("fetchquiz err: ", e);
      return false;
    }
  };

  useEffect(() => {
    getQuiz()
      .then((result) => {
        if (result) navigate("/quiz", { state: { quiz: quizzes } });
      })
      .catch(() => {});
  }, []);
  return <div style={{ fontSize: "3rem" }}>loading</div>;
}
