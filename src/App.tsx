import { Route, Routes } from "react-router-dom";
// import { useState } from 'react'
import "./styles/App.css";
import HomePage from "./pages/HomePage/HomePage";
import TopicsPage from "./pages/TopicsPage/TopicsPage";
import QuizPage from "./pages/QuizPage/QuizPage";
import LoadingPage from "./pages/LoadingPage/LoadingPage";
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/topics" element={<TopicsPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/loading" element={<LoadingPage />} />
      </Routes>
    </>
  );
}

export default App;
