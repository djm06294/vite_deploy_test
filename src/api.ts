// 변수
// card - 퀴즈 주제 (ex. Javascript, 네트워크, 자료구조)
// difficulty - 난이도 (ex. 상, 중, 하)
// quizNum - 문제 갯수
// quizType - 문제 분류 (ex. 객관식, OX, 빈칸채우기)

// 함수
// cleanResponse - 테스트 해봤을때 간혹 불필요한 ``가 포함되서 JSON으로 파싱이 안되는 경우가 있었는데, 이를 방지하기 위한 함수입니다.

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const selectTopic = (topic: string): string => {
  if (topic === "프레임워크 및 라이브러리") {
    return "리액트, SSR과 CSR";
  } else return topic;
};

const selectQuizType = (quizType: QuizType) => {
  let promptInterface = "";

  if (quizType === "객관식") {
    promptInterface = `
      interface Quiz {
        MultipleQuestion: {
          question: string;
          options: string[];
          answer: string;
        }[];
      }
    `;
  } else if (quizType === "OX 퀴즈") {
    promptInterface = `
      interface Quiz {
        TrueOrFalse: {
          question: string;
          option: boolean;
          answer: boolean;
        }[];
      }
    `;
  } else if (quizType === "빈칸 채우기") {
    promptInterface = `
      interface Quiz {
        FillBlank: {
          question: string;
          answer: string;
        }[];
      }
    `;
  }
  return promptInterface;
};

const cleanResponse = (rawResponse: string): string => {
  const jsonStart = rawResponse.indexOf("{");
  const jsonEnd = rawResponse.lastIndexOf("}");
  if (jsonStart !== -1 && jsonEnd !== -1) {
    return rawResponse.substring(jsonStart, jsonEnd + 1);
  }
  throw new Error("Given rawResponse has Invalid JSON format");
};

const fetchQuiz = async ({
  topic,
  difficulty,
  quizNum,
  quizType,
}: QuizOption): Promise<QuizResponse> => {
  const topic_ = selectTopic(topic);
  const promptInterface = selectQuizType(quizType);

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a extremely accurate and diligent quiz generator specializing in high-quality computer science quizzes. Your only role is to create precise, well-structured quizzes based on the user's provided topics and difficulty levels.",
      },
      {
        role: "user",
        content: `
  다음은 ${topic_}에 대한 ${quizType} 문제를 생성하기 위한 인터페이스입니다. 
  반드시 **순수 JSON 데이터**만 생성해 주세요. 
  형식에 맞추어, 불필요한 텍스트 없이 정확한 JSON만 출력해 주세요.
  **중요:** JSON 데이터는 {로 시작하고 }로 끝나야 하며, **정답은 항상 하나만** 포함되어야 합니다.
  ${promptInterface}
  
  아래 기준에 맞는 ${quizNum}개의 ${topic_} 관련 ${quizType} 문제를 한국어로 생성해 주세요:
  - **난이도 설정**: ${difficulty}
    - 하: 컴퓨터 공학을 학습한 비전공자가 풀 수 있을 정도의 쉬운 문제.
    - 중: 컴퓨터 공학 전공자가 관련 내용을 학습해야 풀 수 있는 문제.
    - 상: 해당 주제에 대한 깊은 이해가 필요하고, 문제 해결을 위해 추가적인 학습이 필요한 문제.
  
  문제는 인터페이스 구조에 맞추어 하나의 정답만 포함해야 하며, 추가적인 설명이나 불필요한 텍스트는 출력하지 마세요.`,
      },
    ],
    model: "gpt-3.5-turbo",
  });
  const rawResponse = completion.choices[0].message.content!;
  const response = cleanResponse(rawResponse);
  return JSON.parse(response);
};

export default fetchQuiz;
