import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer"; // 👈 1. Import the Footer
import { FiArrowRight } from "react-icons/fi";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow flex items-center justify-center">
        {/* ... (your main section code remains unchanged) ... */}
        <section className="text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            Find Your <span className="text-blue-600">Future Path</span>, Today.
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Stop the confusion. Our AI-powered guidance platform helps you
            discover the perfect career and education path based on your unique
            interests and strengths.
          </p>
          <div className="mt-8">
            <Link
              to="/quiz"
              className="inline-flex items-center justify-center bg-blue-600 text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105 shadow-lg"
            >
              Take the Free Aptitude Quiz
              <FiArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer /> {/* 👈 2. Add the Footer component here */}
    </div>
  );
};

export default HomePage;
