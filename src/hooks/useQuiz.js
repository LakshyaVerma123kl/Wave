import { useState } from "react";
import { quizQuestions } from "../data/quizData";

export const useQuiz = () => {
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});

  const handleAnswer = (questionIndex, answerIndex) => {
    const newAnswers = { ...answers, [questionIndex]: answerIndex };
    setAnswers(newAnswers);

    const isCorrect = answerIndex === quizQuestions[questionIndex].correct;
    setFeedback({
      ...feedback,
      [questionIndex]: { correct: isCorrect, show: true },
    });
  };

  const resetQuiz = () => {
    setAnswers({});
    setFeedback({});
  };

  const getScore = () => {
    const correctAnswers = Object.keys(answers).filter(
      (questionIndex) =>
        answers[questionIndex] === quizQuestions[questionIndex].correct
    ).length;

    return {
      correct: correctAnswers,
      total: quizQuestions.length,
      percentage: Math.round((correctAnswers / quizQuestions.length) * 100),
    };
  };

  return {
    answers,
    feedback,
    handleAnswer,
    resetQuiz,
    getScore,
  };
};
