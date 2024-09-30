import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import Header from "../../components/Header/Header";

export default function HomePage() {
  return (
    <>
      <Header />
      <body id={styles.homeBody}>
        <section className={styles.background1}> </section>
        <section className={styles.background2}> </section>
        <section className={`${styles.innerBody} mw2`}>
          <h2>Level Up Your</h2>
          <h2>CS Skills</h2>
          <h3>
            CSQuizHub에서 CS 지식을 재미있는 퀴즈로 쉽게 배우고 즐겨보세요!
          </h3>
          <Link to="/topics">
            <button id={styles.startBtn}>시작하기</button>
          </Link>
        </section>
      </body>
    </>
  );
}
