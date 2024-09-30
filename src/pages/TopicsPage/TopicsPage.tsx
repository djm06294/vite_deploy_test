import { useEffect, useState } from "react";
import { useQuizOption } from "../../quiz_zustand.ts";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import styles from "./TopicsPage.module.css";
import Header from "../../components/Header/Header";
import Topic from "../../components/Topic/Topic";
import OptionModal from "../../components/OptionModal/OptionModal";

import "../../types.d.ts";

export default function TopicsPage() {
  const [topics, setTopics] = useState<TopicType[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { setTopic } = useQuizOption((state) => state);

  // 보여줄 topic들을 local db에서 가져오기
  const getTopics = async () => {
    try {
      const res = await fetch("/db.json");
      const data = await res.json();
      return data.topics;
    } catch (e) {
      console.error("json 데이터 불러오기 오류: ", e);
    }
  };

  // 모달 열기 & 클릭한 주제 전역관리에 저장
  const openModal = (idx: number) => {
    setTopic(topics[idx].title);
    setShowModal(true);
  };

  useEffect(() => {
    getTopics().then((data) => {
      if (data) setTopics(data);
    });
  }, []);

  // useEffect(() => console.log("topics!", topics), [topics]);

  return (
    <>
      <Header />
      {showModal && <OptionModal />}

      <main className={`${styles.topicsBody} mw`}>
        <h2>
          <Link to="/">
            <FontAwesomeIcon icon={faArrowLeft} className={styles.backBtn} />
          </Link>
          <i>주제 선택</i>
        </h2>
        <section className={`${styles.innerBody} mw`}>
          {topics.map((topic, idx) => (
            <Topic key={idx} idx={idx} topic={topic} onClickFunc={openModal} />
          ))}
        </section>
      </main>
    </>
  );
}
