// import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
import useQuiz from "../../quiz_zustand.ts";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import fetchQuiz from "../../api.tsx";
import "../../types.d.ts";

import styles from "./QuizPage.module.css";
import Header from "../../components/Header/Header.tsx";
import QuizSlide from "../../components/QuizSlide/QuizSlide.tsx";

export default function QuizPage() {
  const { quizzes } = useQuiz((state) => state);
  return (
    <>
      <Header />
      <div className={styles.swiperWrap}>
        <Swiper
          className={styles.swiper}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          // spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true, type: "progressbar" }}
          scrollbar={{ draggable: true }}
        >
          {quizzes.map((q, idx) => (
            <SwiperSlide key={idx}>
              <QuizSlide quiz={q} quizNum={idx + 1} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
