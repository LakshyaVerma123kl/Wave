import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  X,
  Brain,
  Award,
  TrendingUp,
  Eye,
  BookOpen,
} from "lucide-react";

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 ${className}`}
  >
    {children}
  </div>
);

// Enhanced quiz data with more comprehensive questions
const quizQuestions = [
  {
    id: "energy_transfer",
    question: "What do waves transfer from one place to another?",
    options: [
      "Matter and energy",
      "Energy only",
      "Matter only",
      "Neither matter nor energy",
    ],
    correct: 1,
    explanation:
      "Waves transfer energy without transferring matter. The medium particles vibrate in place while energy travels through them.",
    difficulty: "basic",
    concept: "Wave Fundamentals",
  },
  {
    id: "frequency_pitch",
    question:
      "Which property determines how high or low a sound appears to us?",
    options: ["Amplitude", "Wavelength", "Frequency", "Wave speed"],
    correct: 2,
    explanation:
      "Frequency determines pitch - higher frequencies produce higher pitched sounds, while lower frequencies produce lower pitched sounds.",
    difficulty: "basic",
    concept: "Wave Properties",
  },
  {
    id: "particle_motion",
    question:
      "What happens to the particles in a medium when a wave passes through?",
    options: [
      "They move permanently with the wave",
      "They stay completely still",
      "They vibrate and return to their original position",
      "They disappear and reappear",
    ],
    correct: 2,
    explanation:
      "Medium particles vibrate when a wave passes but return to their original position. This is how energy transfers without matter moving.",
    difficulty: "intermediate",
    concept: "Wave Motion",
  },
  {
    id: "mechanical_waves",
    question: "Which type of wave requires a medium to travel through?",
    options: ["Light waves", "Radio waves", "Sound waves", "X-rays"],
    correct: 2,
    explanation:
      "Sound waves are mechanical waves that require a medium (like air, water, or solid materials) to travel through, unlike electromagnetic waves.",
    difficulty: "basic",
    concept: "Wave Types",
  },
  {
    id: "wave_equation",
    question:
      "According to the wave equation v = fλ, what happens to wavelength when frequency increases while speed stays constant?",
    options: [
      "Wavelength increases",
      "Wavelength decreases",
      "Wavelength stays the same",
      "Wavelength becomes zero",
    ],
    correct: 1,
    explanation:
      "Since v = f × λ and speed (v) is constant, when frequency (f) increases, wavelength (λ) must decrease to maintain the equation balance.",
    difficulty: "intermediate",
    concept: "Wave Mathematics",
  },
  {
    id: "amplitude_energy",
    question: "How does the energy of a wave relate to its amplitude?",
    options: [
      "Energy is proportional to amplitude (E ∝ A)",
      "Energy is proportional to amplitude squared (E ∝ A²)",
      "Energy is inversely proportional to amplitude",
      "Energy is independent of amplitude",
    ],
    correct: 1,
    explanation:
      "Wave energy is proportional to the square of amplitude (E ∝ A²). Doubling the amplitude quadruples the energy.",
    difficulty: "advanced",
    concept: "Wave Energy",
  },
];

// Enhanced quiz hook with more features
const useQuiz = () => {
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);

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

    // Auto-advance after feedback is shown
    setTimeout(() => {
      if (questionIndex < quizQuestions.length - 1) {
        setCurrentQuestion(questionIndex + 1);
      } else {
        setShowResults(true);
      }
    }, 3000);
  };

  const resetQuiz = () => {
    setAnswers({});
    setFeedback({});
    setCurrentQuestion(0);
    setQuizStarted(false);
    setShowResults(false);
  };

  return {
    answers,
    feedback,
    currentQuestion,
    quizStarted,
    showResults,
    handleAnswer,
    setQuizStarted,
    resetQuiz,
    setCurrentQuestion,
  };
};

const QuizSection = ({ onComplete }) => {
  const {
    answers,
    feedback,
    currentQuestion,
    quizStarted,
    showResults,
    handleAnswer,
    setQuizStarted,
    resetQuiz,
  } = useQuiz();

  // Helper functions defined before they're used
  const getCompletedCount = () => {
    return Object.keys(feedback).filter((key) => feedback[key]?.show).length;
  };

  const getCorrectCount = () => {
    return Object.keys(feedback).filter((key) => feedback[key]?.correct).length;
  };

  const isComplete = getCompletedCount() === quizQuestions.length;

  // Calculate completion percentage for internal progress
  const completionPercentage = Math.min(
    (getCompletedCount() / quizQuestions.length) * 100,
    100
  );

  useEffect(() => {
    const answered = Object.keys(feedback).filter(
      (key) => feedback[key]?.show
    ).length;
    if (answered >= 4 || isComplete) {
      setTimeout(() => onComplete?.(), 2000);
    }
  }, [feedback, onComplete, isComplete]);

  const getScoreByDifficulty = () => {
    const basic = quizQuestions.filter((q) => q.difficulty === "basic");
    const intermediate = quizQuestions.filter(
      (q) => q.difficulty === "intermediate"
    );
    const advanced = quizQuestions.filter((q) => q.difficulty === "advanced");

    return {
      basic: basic.filter((q, i) => feedback[i]?.correct).length,
      basicTotal: basic.length,
      intermediate: intermediate.filter((q, i) => feedback[i]?.correct).length,
      intermediateTotal: intermediate.length,
      advanced: advanced.filter((q, i) => feedback[i]?.correct).length,
      advancedTotal: advanced.length,
    };
  };

  const scorePercentage = isComplete
    ? Math.round((getCorrectCount() / quizQuestions.length) * 100)
    : 0;

  const difficultyColors = {
    basic: "text-green-400",
    intermediate: "text-yellow-400",
    advanced: "text-red-400",
  };

  if (!quizStarted && !showResults) {
    return (
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
            <TrendingUp className="w-10 h-10 mr-3 text-purple-400" />
            Wave Knowledge Quiz
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Test your understanding of wave concepts with this comprehensive
            quiz.
          </p>
        </div>

        <Card className="text-center bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
          <div className="space-y-6">
            <div className="inline-flex p-4 bg-purple-500/20 rounded-full">
              <Brain className="w-12 h-12 text-purple-300" />
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Test Your Knowledge?
              </h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                This quiz covers wave fundamentals, properties, types, and
                mathematical relationships. You'll encounter questions of
                varying difficulty levels.
              </p>

              <div className="grid md:grid-cols-3 gap-4 mb-6 max-w-2xl mx-auto">
                <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-3">
                  <div className="text-green-400 font-semibold">Basic</div>
                  <div className="text-sm text-gray-300">Core concepts</div>
                </div>
                <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-3">
                  <div className="text-yellow-400 font-semibold">
                    Intermediate
                  </div>
                  <div className="text-sm text-gray-300">Applications</div>
                </div>
                <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-3">
                  <div className="text-red-400 font-semibold">Advanced</div>
                  <div className="text-sm text-gray-300">
                    Complex relationships
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setQuizStarted(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Start Quiz
            </button>
          </div>
        </Card>
      </section>
    );
  }

  if (showResults) {
    const scores = getScoreByDifficulty();

    return (
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
            <Award className="w-10 h-10 mr-3 text-purple-400" />
            Quiz Results
          </h2>
        </div>

        <Card className="text-center bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
          <div className="space-y-6">
            <div className="inline-flex p-4 bg-purple-500/20 rounded-full">
              <Award className="w-12 h-12 text-purple-300" />
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white mb-2">
                Quiz Complete! 🎉
              </h3>
              <div className="text-4xl font-bold mb-4">
                <span
                  className={`${scorePercentage >= 80 ? "text-green-400" : scorePercentage >= 60 ? "text-yellow-400" : "text-red-400"}`}
                >
                  {getCorrectCount()}/{quizQuestions.length} ({scorePercentage}
                  %)
                </span>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <div className="text-green-400 font-semibold text-lg">
                  {scores.basic}/{scores.basicTotal}
                </div>
                <div className="text-sm text-gray-300">Basic Questions</div>
              </div>
              <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
                <div className="text-yellow-400 font-semibold text-lg">
                  {scores.intermediate}/{scores.intermediateTotal}
                </div>
                <div className="text-sm text-gray-300">Intermediate</div>
              </div>
              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
                <div className="text-red-400 font-semibold text-lg">
                  {scores.advanced}/{scores.advancedTotal}
                </div>
                <div className="text-sm text-gray-300">Advanced</div>
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-white/90 font-medium mb-2">
                {scorePercentage >= 90
                  ? "🌟 Outstanding! Wave Physics Expert!"
                  : scorePercentage >= 80
                    ? "🎯 Excellent! Great understanding!"
                    : scorePercentage >= 70
                      ? "👍 Good work! Solid foundation!"
                      : scorePercentage >= 60
                        ? "💪 Fair effort! Room for improvement!"
                        : "📚 Keep studying! Practice makes perfect!"}
              </p>
              <p className="text-white/70 text-sm">
                {scorePercentage >= 80
                  ? "You have mastered the fundamental concepts of waves!"
                  : "Review the concepts and try the simulation to improve your understanding."}
              </p>
            </div>

            <button
              onClick={resetQuiz}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200"
            >
              Retake Quiz
            </button>
          </div>
        </Card>

        {/* Concept Review */}
        <Card className="bg-blue-900/20 border-blue-700/30">
          <h3 className="text-blue-300 font-semibold text-xl mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Concept Review
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {quizQuestions.map((q, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  feedback[index]?.correct
                    ? "bg-green-900/20 border-green-700/50"
                    : "bg-red-900/20 border-red-700/50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">
                    {q.concept}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${difficultyColors[q.difficulty]} bg-gray-800/50`}
                  >
                    {q.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {feedback[index]?.correct ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : (
                    <X className="w-4 h-4 text-red-400" />
                  )}
                  <span className="text-white text-sm">
                    Question {index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
          <TrendingUp className="w-10 h-10 mr-3 text-purple-400" />
          Wave Knowledge Quiz
        </h2>
        <div className="flex items-center justify-center gap-4 text-gray-300">
          <span>
            Question {currentQuestion + 1} of {quizQuestions.length}
          </span>
          <div className="w-48 bg-gray-700 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      <Card className="bg-gray-800/40 border-gray-700/40">
        {quizQuestions
          .slice(0, currentQuestion + 1)
          .map((question, questionIndex) => {
            if (
              questionIndex !== currentQuestion &&
              !feedback[questionIndex]?.show
            )
              return null;

            const isCurrentQuestion = questionIndex === currentQuestion;
            const isAnswered = feedback[questionIndex]?.show;

            return (
              <div
                key={questionIndex}
                className={`space-y-6 ${!isCurrentQuestion && "opacity-50 pointer-events-none"}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center text-sm font-bold text-purple-300">
                      {questionIndex + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs px-2 py-1 rounded ${difficultyColors[question.difficulty]} bg-gray-800/50`}
                        >
                          {question.difficulty}
                        </span>
                        <span className="text-xs text-gray-400">
                          {question.concept}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-white">
                        {question.question}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 ml-13">
                  {question.options.map((option, optionIndex) => {
                    const isSelected = answers[questionIndex] === optionIndex;
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
                          isCurrentQuestion &&
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
                        disabled={isAnswered || !isCurrentQuestion}
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
                  <div className="ml-13 mt-4">
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
            );
          })}
      </Card>

      {/* Progress with completion indicator */}
      <div className="flex justify-center">
        <div className="bg-gray-800/40 rounded-full px-6 py-3 border border-gray-700/40">
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm">Progress:</span>
            <div className="flex space-x-1">
              {quizQuestions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    feedback[index]?.show
                      ? feedback[index].correct
                        ? "bg-green-400"
                        : "bg-red-400"
                      : index === currentQuestion
                        ? "bg-purple-400"
                        : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-white font-semibold">
              {getCompletedCount()}/{quizQuestions.length}
            </span>
            <div className="w-16 bg-gray-700 rounded-full h-2 ml-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <span className="text-purple-400 text-sm font-medium">
              {Math.round(completionPercentage)}%
            </span>
          </div>
        </div>
      </div>

      {/* Study tip */}
      {getCompletedCount() > 0 && !isComplete && (
        <Card className="bg-blue-500/10 border-blue-500/20 text-center">
          <div className="flex items-center justify-center gap-3">
            <Eye className="w-6 h-6 text-blue-300" />
            <p className="text-blue-100">
              {getCorrectCount()}/{getCompletedCount()} correct so far -
              {getCorrectCount() / Math.max(getCompletedCount(), 1) >= 0.8
                ? " Excellent work!"
                : " Keep going!"}
            </p>
          </div>
        </Card>
      )}
    </section>
  );
};

export default QuizSection;
