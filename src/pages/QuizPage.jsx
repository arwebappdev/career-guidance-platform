import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { quizData } from "../data/mockQuizData"; // Import our questions
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleAnswerClick = (trait) => {
    setAnswers((prev) => ({ ...prev, [trait]: (prev[trait] || 0) + 1 }));

    const isLastQuestion = currentQuestionIndex === quizData.length - 1;
    if (isLastQuestion) {
      // 👇 Update this line to pass the state
      navigate("/dashboard", {
        state: { results: { ...answers, [trait]: (answers[trait] || 0) + 1 } },
      });
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const currentQuestion = quizData[currentQuestionIndex];
  const progressPercentage =
    ((currentQuestionIndex + 1) / quizData.length) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow container mx-auto flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
          {/* Progress Bar */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-500 mb-2">
              Question {currentQuestionIndex + 1} of {quizData.length}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Question Text */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option.trait)}
                className="w-full bg-gray-100 text-gray-700 font-semibold p-4 rounded-lg text-left hover:bg-blue-100 hover:ring-2 hover:ring-blue-400 transition-all duration-200"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QuizPage;
