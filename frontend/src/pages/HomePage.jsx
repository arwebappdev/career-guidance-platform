import React from "react";
import { useNavigate } from "react-router-dom"; // 👈 Import useNavigate
import Footer from "../components/layout/Footer";
import {
  FiArrowRight,
  FiCheckCircle,
  FiAward,
  FiTrendingUp,
  FiSearch,
} from "react-icons/fi";
import { assets } from "../assets/assets";

const HomePage = ({ user }) => { // 👈 Accept user prop
  const navigate = useNavigate();

  const handleQuizButtonClick = () => {
    if (!user) {
      // If user is not logged in, redirect to login page
      navigate('/login');
    } else {
      // If user is logged in, check if a profile exists in localStorage
      const userProfile = localStorage.getItem(`userProfile_${user.uid}`);
      if (userProfile) {
        // If profile exists, redirect to the assessment
        navigate('/assessment');
      } else {
        // If no profile exists, redirect to the profile creation page
        navigate('/profile');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow">
        {/* Hero Section with Static Background */}
        <div
          className="bg-cover bg-center bg-no-repeat sticky top-1"
          style={{ backgroundImage: `url(${assets.background})` }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60"></div>
          <div className="relative z-10 flex items-center justify-center h-[600px] text-center px-4 text-white">
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-md">
                Find Your <span className="text-yellow-600">Future Path</span>,
                Today.
              </h1>
              <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto drop-shadow-sm">
                Stop the confusion. Our AI-powered guidance platform helps you
                discover the perfect career and education path based on your
                unique interests and strengths.
              </p>
              <div className="mt-10">
                {/* 👇 This is the button with the new logic */}
                <button
                  onClick={handleQuizButtonClick}
                  className="inline-flex items-center justify-center bg-yellow-700 text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-yellow-800 transition-transform duration-300 transform hover:scale-105 shadow-lg"
                >
                  Take the Free Aptitude Quiz
                  <FiArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <section
          className="relative py-24 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ backgroundImage: `url(${assets.background})` }}
        >
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60"></div>
            <div className="relative z-10">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            How It Works
                        </h2>
                        <p className="mt-4 text-lg text-white max-w-2xl mx-auto">
                            A simple, three-step process to unlock your future potential.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-10 text-center">
                        <div className="p-8 bg-white rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                            <FiAward className="mx-auto text-yellow-600 h-12 w-12 mb-4" />
                            <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                                1. Take the Assessment
                            </h3>
                            <p className="text-gray-600">
                                Answer a series of questions to help us understand your
                                interests, skills, and personality.
                            </p>
                        </div>
                        <div className="p-8 bg-white rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                            <FiSearch className="mx-auto text-yellow-600 h-12 w-12 mb-4" />
                            <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                                2. Get Your Results
                            </h3>
                            <p className="text-gray-600">
                                Receive a detailed report with personalized career and
                                college recommendations.
                            </p>
                        </div>
                        <div className="p-8 bg-white rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                            <FiTrendingUp className="mx-auto text-yellow-600 h-12 w-12 mb-4" />
                            <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                                3. Explore Your Options
                            </h3>
                            <p className="text-gray-600">
                                Discover detailed information about careers, colleges, and
                                courses that match your profile.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section className="py-10 bg-gray-200 sticky">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="pr-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  Why Choose Us?
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <FiCheckCircle className="text-yellow-600 h-7 w-7 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Personalized Recommendations
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Our AI algorithm provides recommendations tailored specifically to you.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiCheckCircle className="text-yellow-600 h-7 w-7 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Comprehensive Database
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Access a vast database of colleges, courses, and career
                        paths.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiCheckCircle className="text-yellow-600 h-7 w-7 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Lifetime Access & Support
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Offer long-term value, showing you're a partner in their career journey.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiCheckCircle className="text-yellow-600 h-7 w-7 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Expert Guidance
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Get insights and advice from career counseling experts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-50 ">
                <img
                  src={assets.feature}
                  alt="Feature"
                  className="rounded-md shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-gray-50 sticky">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                What Our Users Say
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-yellow-600 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                <p className="text-white mb-6 italic">
                  "This platform was a game-changer for me. I was so confused
                  about my career, but the assessment gave me clarity and
                  direction."
                </p>
                <p className="font-bold text-white text-right">
                  - Sarah J.
                </p>
              </div>
              <div className="bg-yellow-600 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                <p className="text-white mb-6 italic">
                  "The college recommendations were spot on! I found the
                  perfect university that matched my interests and academic
                  profile."
                </p>
                <p className="font-bold text-white text-right">
                  - Michael B.
                </p>
              </div>
              <div className="bg-yellow-600 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                <p className="text-white mb-6 italic">
                  "A fantastic tool for any student feeling lost about their
                  future. Highly recommended!"
                </p>
                <br />
                <p className="font-bold text-white text-right">
                  - Emily R.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-24 bg-gray-200 text-black text-center sticky">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Discover Your Future?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Take the first step towards a fulfilling career. Our free
              assessment is waiting for you.
            </p>
            <button
              onClick={handleQuizButtonClick}
              className="inline-flex items-center justify-center bg-white text-yellow-700 font-bold text-lg px-8 py-4 rounded-full hover:bg-gray-200 transition-transform duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Your Journey Now
              <FiArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;