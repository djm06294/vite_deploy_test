import { useState } from "react";
import { useQuizOption } from "../../quiz_zustand.ts";
import styles from "./OptionModal.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import "../../types.d.ts";

const probTypes: QuizType[] = ["객관식", "빈칸 채우기", "OX 퀴즈"];

export default function OptionModal() {
  const [activeProbType, setActiveProbType] = useState<number>(0);
  const [probLevel, setProbLevel] = useState<string>("중"); // 난의도 상태 추가
  const [probNum, setProbNum] = useState<string>("10"); // 문제 수 상태 추가
  const { quizOption, setType, setDiff, setNum } = useQuizOption(
    (state) => state
  );

  // 문제유형버튼 클릭시 전역에 저장
  const selectProbType = (idx: number) => {
    setActiveProbType(idx);
    setType(probTypes[idx]);

    console.log(quizOption);
  };

  // 난의도 선택시 전역에 저장
  const selectProbDiff = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const temp = e.target.value as Difficulty;
    setProbLevel(e.target.value);
    setDiff(temp);
    console.log(quizOption);
  };

  // 문제 수 선택시 전역에 저장
  const selectProbNum = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const temp = e.target.value as QuizNum;
    setProbNum(e.target.value);
    setNum(temp);
    console.log(quizOption);
  };

  // useEffect(() => {
  //   console.log("id", activeProbType);
  // }, [activeProbType]);
  return (
    <>
      <div className={styles.modalBackground}></div>
      <div className={styles.optionModal}>
        <h3>옵션 선택</h3>
        <label htmlFor="probLevel">난의도</label>
        <select
          name="probLevel"
          id={styles.probLevel}
          value={probLevel} // selected 대신 value 사용
          onChange={selectProbDiff}
        >
          <option value="하">초급</option>
          <option value="중">중급</option>
          <option value="상">고급</option>
        </select>
        <label htmlFor="probNum">문제 수</label>
        <select
          name="probNum"
          id={styles.probNum}
          value={probNum}
          onChange={selectProbNum}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>

        <label htmlFor="probType">문제 유형</label>
        <div id={styles.probType}>
          {probTypes.map((v, idx) => (
            <button
              key={idx}
              className={activeProbType === idx ? styles.active : ""}
              onClick={() => selectProbType(idx)}
            >
              {v}
            </button>
          ))}
        </div>

        <Link to="/loading">
          <button className={styles.submitBtn}>퀴즈 생성</button>
        </Link>
        <FontAwesomeIcon icon={faClose} className={styles.closeBtn} />
      </div>
    </>
  );
}
