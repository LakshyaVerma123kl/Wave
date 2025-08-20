import React from "react";
import { CheckCircle } from "lucide-react";
import { useQuiz } from "../../hooks/useQuiz";
import { quizQuestions } from "../../data/quizData";
import Card from "../ui/Card";

const QuizSection = () => {
  const { answers, feedback, handleAnswer } = useQuiz();

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white text-center mb-6">
        Test Your Knowledge 🧠
      </h2>

      <div className="space-y-6">
        {quizQuestions.map((question, questionIndex) => (
          <Card key={questionIndex} className="bg-gray-800">
            <h3 className="text-lg font-semibold text-white mb-4">
              {questionIndex + 1}. {question.question}
            </h3>

            <div className="grid gap-3">
              {question.options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  onClick={() => handleAnswer(questionIndex, optionIndex)}
                  className={`p-3 text-left rounded-lg transition-colors ${
                    answers[questionIndex] === optionIndex
                      ? feedback[questionIndex]?.correct
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-gray-200"
                  }`}
                  disabled={feedback[questionIndex]?.show}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {answers[questionIndex] === optionIndex &&
                      feedback[questionIndex]?.show && (
                        <CheckCircle className="w-5 h-5" />
                      )}
                  </div>
                </button>
              ))}
            </div>

            {feedback[questionIndex]?.show && (
              <div
                className={`mt-4 p-3 rounded-lg ${
                  feedback[questionIndex].correct
                    ? "bg-green-900/30 border border-green-600"
                    : "bg-red-900/30 border border-red-600"
                }`}
              >
                <p
                  className={`font-semibold ${feedback[questionIndex].correct ? "text-green-400" : "text-red-400"}`}
                >
                  {feedback[questionIndex].correct
                    ? "✅ Correct!"
                    : "❌ Incorrect"}
                </p>
                <p className="text-gray-300 mt-1">{question.explanation}</p>
              </div>
            )}
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 text-center">
        <h3 className="text-xl font-semibold text-white mb-2">🎉 Great Job!</h3>
        <p className="text-gray-300">
          You've completed the Waves module! Remember: waves transfer energy,
          not matter, and their properties determine how we perceive them in the
          real world.
        </p>
      </Card>
    </div>
  );
};

export default QuizSection;
