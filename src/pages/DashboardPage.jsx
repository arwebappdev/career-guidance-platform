import React from "react";
import { useLocation, Link } from "react-router-dom";
import { mockResultsData } from "../data/mockResultsData";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { FaLightbulb, FaBook, FaBriefcase } from "react-icons/fa";

const DashboardPage = () => {
  const location = useLocation();
  const results = location.state?.results || {};

  // Find the dominant trait
  const getDominantTrait = (res) => {
    if (!res || Object.keys(res).length === 0) return "Analytical"; // Default fallback
    return Object.keys(res).reduce((a, b) => (res[a] > res[b] ? a : b));
  };

  const dominantTrait = getDominantTrait(results);
  const recommendations = mockResultsData[dominantTrait];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow container mx-auto p-6">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <FaLightbulb className="mx-auto h-12 w-12 text-yellow-400 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800">
              Congratulations! Here are your results.
            </h1>
            <p className="text-gray-600 mt-2">
              Based on your answers, your dominant trait is:
            </p>
            <span className="text-2xl font-extrabold text-blue-600 mt-1 inline-block">
              {recommendations.title} ({dominantTrait})
            </span>
            <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
              {recommendations.description}
            </p>
          </div>

          {/* Recommended Streams */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <FaBook className="mr-3 text-blue-600" />
              Recommended Streams
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendations.streams.map((stream) => (
                <div
                  key={stream}
                  className="bg-blue-50 p-4 rounded-lg text-center font-semibold text-blue-800"
                >
                  {stream}
                </div>
              ))}
            </div>
          </div>

          {/* Potential Careers */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <FaBriefcase className="mr-3 text-blue-600" />
              Potential Career Paths
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendations.careers.map((career) => (
                <div
                  key={career}
                  className="bg-green-50 p-4 rounded-lg text-center font-semibold text-green-800"
                >
                  {career}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10">
            <Link
              to="/colleges"
              className="bg-green-600 text-white font-bold text-lg px-8 py-3 rounded-full hover:bg-green-700 transition-colors"
            >
              Explore Colleges for You
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
