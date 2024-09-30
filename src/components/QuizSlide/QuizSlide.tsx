// import { useQuery } from '@tanstack/react-query';
import styles from "./QuizSlide.module.css";
import "../../types.d.ts";

type QuizProps = { quiz: Quiz; quizNum: number };

export default function QuizSlide({ quiz, quizNum }: QuizProps) {
  return (
    <div className={styles.slide}>
      <h4>Q{quizNum}</h4>
      <p className={styles.question}>{quiz.question}</p>
      <div className={styles.options}>
        {quiz.options.map((v, idx) => (
          <button key={idx}>{v}</button>
        ))}
      </div>
    </div>
  );
}
