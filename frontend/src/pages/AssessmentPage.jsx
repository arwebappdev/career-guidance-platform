import React, { useState, useEffect, useRef } from "react";
import { assessmentQuestions } from "../data/assessmentData";
import { analyzeAssessment } from "../utils/assessmentAnalysis";
import Chart from "chart.js/auto";

const AssessmentPage = () => {
  const [userType, setUserType] = useState(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showIntro, setShowIntro] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const categoryOrder = Object.keys(assessmentQuestions);

  useEffect(() => {
    if (showResults && results) {
      const ctx = chartRef.current.getContext("2d");
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      chartInstance.current = new Chart(ctx, {
        type: "radar",
        data: {
          labels: results.interim_reports.map((report) =>
            report.title.replace(" Report", "")
          ),
          datasets: [
            {
              label: "Assessment Score",
              data: results.interim_reports.map((report) => report.score),
              fill: true,
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              borderColor: "rgba(59, 130, 246, 1)",
              pointBackgroundColor: "rgba(59, 130, 246, 1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(59, 130, 246, 1)",
            },
          ],
        },
        options: {
          scales: {
            r: {
              angleLines: {
                display: false,
              },
              suggestedMin: 0,
              suggestedMax: 100,
            },
          },
        },
      });
    }
  }, [showResults, results]);

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setShowIntro(true);
  };

  const handleStartAssessment = () => {
    setShowIntro(false);
    setShowAssessment(true);
  };

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers };
    const currentCategory = categoryOrder[currentCategoryIndex];
    if (!newAnswers[currentCategory]) {
      newAnswers[currentCategory] = {};
    }
    newAnswers[currentCategory][currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    const currentCategory = categoryOrder[currentCategoryIndex];
    const categoryQuestions = assessmentQuestions[currentCategory];

    if (currentQuestionIndex < categoryQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentCategoryIndex < categoryOrder.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      const finalResults = analyzeAssessment(answers, userType);
      setResults(finalResults);
      setShowResults(true);
      setShowAssessment(false);
    }
  };

  const handleReset = () => {
    setUserType(null);
    setShowIntro(false);
    setShowAssessment(false);
    setShowResults(false);
    setResults(null);
    setAnswers({});
    setCurrentCategoryIndex(0);
    setCurrentQuestionIndex(0);
  };

  const renderCurrentQuestion = () => {
    if (!showAssessment) return null;

    const currentCategory = categoryOrder[currentCategoryIndex];
    const question = assessmentQuestions[currentCategory][currentQuestionIndex];

    return (
      <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
        <p className="text-lg font-semibold text-gray-700 mb-4">
          {question.question}
        </p>
        <div className="space-y-4">
          {question.type === "mcq" ? (
            question.options.map((option, index) => (
              <label
                key={index}
                className="block cursor-pointer p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  className="mr-2"
                  onChange={() => handleAnswer(option)}
                />
                {option}
              </label>
            ))
          ) : (
            <div className="flex flex-col items-center">
              <input
                type="range"
                min={question.min}
                max={question.max}
                defaultValue="5"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                onChange={(e) => handleAnswer(e.target.value)}
              />
              <div className="flex justify-between w-full text-sm text-gray-500 mt-2">
                <span>{question.label.split(" to ")[0]}</span>
                <span>{question.label.split(" to ")[1]}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const totalQuestions = categoryOrder.reduce(
    (acc, category) => acc + assessmentQuestions[category].length,
    0
  );
  const answeredQuestions = categoryOrder.reduce((acc, category) => {
    const categoryAnswers = answers[category]
      ? Object.keys(answers[category]).length
      : 0;
    return acc + categoryAnswers;
  }, 0);
  const progress =
    totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full p-8 transition-all duration-300">
        <header className="flex items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            AI Career Assessment
          </h1>
        </header>

        {!userType && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Who are you?</h2>
            <p className="text-gray-500 mt-2">
              Let us know if you're a school student or a college student so we
              can provide the best advice for you.
            </p>
            <div className="mt-8 space-y-4">
              <button
                onClick={() => handleUserTypeSelect("student")}
                className="w-full px-8 py-4 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors"
              >
                I am a School Student
              </button>
              <button
                onClick={() => handleUserTypeSelect("college")}
                className="w-full px-8 py-4 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors"
              >
                I am a College Student
              </button>
            </div>
          </div>
        )}

        {showIntro && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome to Your Career Assessment!
            </h2>
            <p className="text-gray-500 mt-2">
              Find your best-fit career path. This is a journey of
              self-discovery, not just a simple quiz. Each step builds a more
              complete picture of your potential.
            </p>
            <button
              onClick={handleStartAssessment}
              className="mt-8 px-8 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors"
            >
              Start Assessment
            </button>
          </div>
        )}

        {showAssessment && (
          <>
            <div className="progress-bar mb-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="progress-fill h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-right text-sm text-gray-500 mb-6">
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <ul className="flex border-b border-gray-200 text-sm font-medium -mb-px">
              {categoryOrder.map((category, index) => (
                <li
                  key={category}
                  className={`flex-1 text-center py-2 px-4 border-b-2 transition-colors ${
                    currentCategoryIndex === index
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500"
                  } ${
                    index > currentCategoryIndex
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  {category}
                </li>
              ))}
            </ul>
            <div className="p-6">
              <div className="min-h-[250px] flex flex-col justify-center">
                {renderCurrentQuestion()}
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}

        {showResults && results && (
          <div className="p-6 mt-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
              Your Final Personalized Report
            </h2>
            <div className="w-full max-w-2xl mx-auto mb-8 p-4 bg-white rounded-lg shadow-inner">
              <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">
                Overall Performance
              </h3>
              <canvas ref={chartRef}></canvas>
            </div>
            <div className="space-y-6">
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 text-blue-800">
                <h3 className="text-xl font-semibold mb-2">
                  Key Personality Traits
                </h3>
                <ul className="list-disc list-inside space-y-1">
                  {results.final_report.personality_traits.map(
                    (trait, index) => (
                      <li key={index}>{trait}</li>
                    )
                  )}
                </ul>
              </div>
              {userType === "student" ? (
                <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 text-blue-800">
                  <h3 className="text-xl font-semibold mb-2">
                    Recommended Academic Streams
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {results.final_report.academic_streams.map(
                      (stream, index) => (
                        <li key={index}>{stream}</li>
                      )
                    )}
                  </ul>
                </div>
              ) : (
                <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 text-blue-800">
                  <h3 className="text-xl font-semibold mb-2">
                    Recommended Career Paths
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    {results.final_report.career_recommendations.map(
                      (path, index) => (
                        <li key={index}>{path}</li>
                      )
                    )}
                  </ul>
                </div>
              )}
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 text-blue-800">
                <h3 className="text-xl font-semibold mb-2">
                  Analysis & Explanation
                </h3>
                <p>{results.final_report.explanation}</p>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="mt-6 w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-full shadow-md hover:bg-green-600 transition-colors"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentPage;
