import React, { useState } from "react";
import { CheckCircle, X, Brain, Award } from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 ${className}`}
  >
    {children}
  </div>
);

// Mock quiz data for demonstration
const quizQuestions = [
  {
    question: "What do waves transfer from one place to another?",
    options: ["Matter", "Energy", "Water", "Sound only"],
    correct: 1,
    explanation:
      "Waves transfer energy without transferring matter. The medium particles vibrate in place while energy travels through them.",
  },
  {
    question:
      "Which property determines how high or low a sound appears to us?",
    options: ["Amplitude", "Wavelength", "Frequency", "Speed"],
    correct: 2,
    explanation:
      "Frequency determines pitch - higher frequencies produce higher pitched sounds, while lower frequencies produce lower pitched sounds.",
  },
  {
    question:
      "What happens to the particles in a medium when a wave passes through?",
    options: [
      "They move with the wave",
      "They stay in the same place",
      "They vibrate and return to position",
      "They disappear",
    ],
    correct: 2,
    explanation:
      "Medium particles vibrate when a wave passes but return to their original position. This is how energy transfers without matter moving.",
  },
  {
    question: "Which type of wave requires a medium to travel through?",
    options: ["Light waves", "Radio waves", "Sound waves", "X-rays"],
    correct: 2,
    explanation:
      "Sound waves are mechanical waves that require a medium (like air, water, or solid materials) to travel through, unlike electromagnetic waves.",
  },
];

// Mock quiz hook
const useQuiz = () => {
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});

  const handleAnswer = (questionIndex, optionIndex) => {
    const isCorrect = optionIndex === quizQuestions[questionIndex].correct;

    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));

    setFeedback((prev) => ({
      ...prev,
      [questionIndex]: {
        show: true,
        correct: isCorrect,
      },
    }));
  };

  return { answers, feedback, handleAnswer };
};

const QuizSection = () => {
  const { answers, feedback, handleAnswer } = useQuiz();

  const getCompletedCount = () => {
    return Object.keys(feedback).filter((key) => feedback[key]?.show).length;
  };

  const getCorrectCount = () => {
    return Object.keys(feedback).filter((key) => feedback[key]?.correct).length;
  };

  const isComplete = getCompletedCount() === quizQuestions.length;
  const scorePercentage = isComplete
    ? Math.round((getCorrectCount() / quizQuestions.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex p-4 bg-purple-500/20 rounded-full">
            <Brain className="w-12 h-12 text-purple-300" />
          </div>
          <h2 className="text-4xl font-bold">Test Your Knowledge 🧠</h2>
          <p className="text-purple-100 text-lg">
            Let's see how well you understand waves!
          </p>

          {/* Progress indicator */}
          {getCompletedCount() > 0 && (
            <div className="bg-white/10 rounded-full p-1 max-w-md mx-auto">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${(getCompletedCount() / quizQuestions.length) * 100}%`,
                }}
              />
            </div>
          )}
        </div>

        {/* Quiz Questions */}
        <div className="space-y-6">
          {quizQuestions.map((question, questionIndex) => (
            <Card key={questionIndex}>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-sm font-bold text-purple-300">
                    {questionIndex + 1}
                  </span>
                  <span className="text-white">{question.question}</span>
                </h3>

                <div className="space-y-3 ml-11">
                  {question.options.map((option, optionIndex) => {
                    const isSelected = answers[questionIndex] === optionIndex;
                    const isAnswered = feedback[questionIndex]?.show;
                    const isCorrect =
                      feedback[questionIndex]?.correct && isSelected;
                    const isIncorrect =
                      !feedback[questionIndex]?.correct &&
                      isSelected &&
                      isAnswered;
                    const isCorrectAnswer =
                      isAnswered && optionIndex === question.correct;

                    return (
                      <button
                        key={optionIndex}
                        onClick={() =>
                          !isAnswered &&
                          handleAnswer(questionIndex, optionIndex)
                        }
                        className={`w-full p-4 text-left rounded-lg transition-all duration-200 border ${
                          isCorrect
                            ? "bg-green-500/20 border-green-500/50 text-green-100"
                            : isIncorrect
                              ? "bg-red-500/20 border-red-500/50 text-red-100"
                              : isCorrectAnswer && isAnswered
                                ? "bg-green-500/20 border-green-500/50 text-green-100"
                                : isAnswered
                                  ? "bg-white/5 border-white/10 text-white/60 cursor-not-allowed"
                                  : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-white cursor-pointer"
                        }`}
                        disabled={isAnswered}
                      >
                        <div className="flex items-center justify-between">
                          <span className="flex-1">{option}</span>
                          {isSelected && isAnswered && (
                            <div className="ml-3">
                              {isCorrect ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              ) : (
                                <X className="w-5 h-5 text-red-400" />
                              )}
                            </div>
                          )}
                          {!isSelected && isCorrectAnswer && isAnswered && (
                            <CheckCircle className="w-5 h-5 text-green-400 ml-3" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {feedback[questionIndex]?.show && (
                  <div className="ml-11 mt-4">
                    <div
                      className={`p-4 rounded-lg border-l-4 ${
                        feedback[questionIndex].correct
                          ? "bg-green-900/20 border-l-green-500"
                          : "bg-red-900/20 border-l-red-500"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {feedback[questionIndex].correct ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-green-400" />
                            <span className="font-semibold text-green-400">
                              Correct!
                            </span>
                          </>
                        ) : (
                          <>
                            <X className="w-5 h-5 text-red-400" />
                            <span className="font-semibold text-red-400">
                              Not quite right
                            </span>
                          </>
                        )}
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Results Summary */}
        {isComplete && (
          <Card className="text-center bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
            <div className="space-y-4">
              <div className="inline-flex p-4 bg-purple-500/20 rounded-full">
                <Award className="w-12 h-12 text-purple-300" />
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  Quiz Complete! 🎉
                </h3>
                <div className="text-2xl font-bold mb-4">
                  <span
                    className={`${scorePercentage >= 75 ? "text-green-400" : scorePercentage >= 50 ? "text-yellow-400" : "text-red-400"}`}
                  >
                    {getCorrectCount()}/{quizQuestions.length} (
                    {scorePercentage}%)
                  </span>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-white/90 font-medium mb-2">
                  {scorePercentage >= 90
                    ? "🌟 Excellent work!"
                    : scorePercentage >= 75
                      ? "👍 Great job!"
                      : scorePercentage >= 50
                        ? "💪 Good effort!"
                        : "📚 Keep studying!"}
                </p>
                <p className="text-white/70 text-sm">
                  Remember: waves transfer energy, not matter, and their
                  properties determine how we perceive them in the real world.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Study tip for incomplete quiz */}
        {!isComplete && getCompletedCount() > 0 && (
          <Card className="bg-blue-500/10 border-blue-500/20 text-center">
            <div className="flex items-center justify-center gap-3">
              <Brain className="w-6 h-6 text-blue-300" />
              <p className="text-blue-100">
                Progress: {getCompletedCount()}/{quizQuestions.length} questions
                completed
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default QuizSection;
