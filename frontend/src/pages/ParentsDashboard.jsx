import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  BarChart2,
  Star,
  MessageCircle,
  BookOpen,
} from "lucide-react";

const ParentsDashboard = () => {
  // State for the interactive sliders
  const [tuition, setTuition] = useState(40000);
  const [years, setYears] = useState(4);
  const [roiResult, setRoiResult] = useState(910000);

  // Effect to recalculate ROI whenever tuition or years change
  useEffect(() => {
    const startingSalary = 75000;
    const midCareerSalary = 130000;
    const yearsToMidCareer = 5;

    // Fictional ROI calculation logic
    const lifetimeEarnings =
      startingSalary * yearsToMidCareer +
      midCareerSalary * (10 - yearsToMidCareer) -
      tuition;
    const adjustedROI = lifetimeEarnings - tuition * 0.5; // Simple adjustment

    setRoiResult(Math.round(adjustedROI / 1000) * 1000);
  }, [tuition, years]);

  const handleTuitionChange = (e) => {
    setTuition(parseInt(e.target.value));
  };

  const handleYearsChange = (e) => {
    setYears(parseInt(e.target.value));
  };

  return (
    <div className="bg-gray-100 p-4 sm:p-8 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-3xl shadow-lg border border-gray-200">
        {/* Header Section */}
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-black mb-2">
            Welcome!
          </h1>
          <p className="text-lg text-gray-600">
            This dashboard is designed to help you understand and support your
            child's career journey.
          </p>
        </header>

        {/* Child's Career Snapshot */}
        <section className="mb-8 p-6 bg-yellow-50 rounded-2xl border-2 border-yellow-200 shadow-sm">
          <h2 className="text-2xl font-bold text-yellow-800 mb-4 flex items-center">
            <GraduationCap className="mr-3 text-yellow-600" />
            Your Child's Career Snapshot
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {/* Top Match (Highest Market Worth) */}
            <div className="bg-white p-6 rounded-xl border border-yellow-200 shadow-md transform transition-transform duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Top Match
              </h3>
              <p className="text-lg font-bold text-yellow-700">
                Software Developer
              </p>
              <p className="text-sm text-gray-500 mt-1">
                A field with high earning potential and job security.
              </p>
            </div>
            {/* Second Match */}
            <div className="bg-white p-6 rounded-xl border border-yellow-200 shadow-md transform transition-transform duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Second Match
              </h3>
              <p className="text-lg font-bold text-yellow-700">
                Financial Analyst
              </p>
              <p className="text-sm text-gray-500 mt-1">
                A stable career with excellent growth opportunities.
              </p>
            </div>
            {/* Third Match */}
            <div className="bg-white p-6 rounded-xl border border-yellow-200 shadow-md transform transition-transform duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Third Match
              </h3>
              <p className="text-lg font-bold text-yellow-700">UX Designer</p>
              <p className="text-sm text-gray-500 mt-1">
                Combines creativity with high demand in the tech industry.
              </p>
            </div>
          </div>
        </section>

        {/* ROI Calculator Section */}
        <section className="mb-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <BarChart2 className="mr-3 text-yellow-600" />
            ROI: The Value of Their Path
          </h2>
          <div className="text-gray-600 mb-4">
            <p className="mb-2">
              <strong className="text-gray-800">Suggested Career:</strong>{" "}
              <span className="text-yellow-700 font-medium">
                Software Developer
              </span>
            </p>
            <p className="mb-2">
              <strong className="text-gray-800">
                Average Starting Salary:
              </strong>{" "}
              <span className="text-green-600 font-medium">₹75,000</span>
            </p>
            <p className="mb-2">
              <strong className="text-gray-800">Mid-Career Salary:</strong>{" "}
              <span className="text-green-600 font-medium">₹130,000+</span>
            </p>
            <p>
              <strong className="text-gray-800">Projected Job Growth:</strong>{" "}
              <span className="text-green-600 font-medium">25% by 2032</span>{" "}
              (Source: BLS)
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-xl shadow-inner mt-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Projected Educational Costs
            </h3>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li className="flex justify-between items-center">
                <span>Tuition & Fees (4 years):</span>
                <span className="font-medium text-gray-800">₹40,000</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Books & Supplies (estimated):</span>
                <span className="font-medium text-gray-800">₹3,000</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Living Expenses (estimated):</span>
                <span className="font-medium text-gray-800">₹60,000</span>
              </li>
              <li className="flex justify-between items-center font-bold">
                <span>Total Estimated Cost:</span>
                <span className="text-yellow-700 text-lg">₹103,000</span>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Interactive ROI Calculator
            </h3>
            <div className="mb-4">
              <label
                htmlFor="tuitionSlider"
                className="block text-gray-700 font-medium mb-2"
              >
                Tuition Costs:{" "}
                <span id="tuitionValue" className="text-yellow-700">
                  ₹{tuition.toLocaleString()}
                </span>
              </label>
              <input
                type="range"
                id="tuitionSlider"
                min="0"
                max="100000"
                value={tuition}
                onChange={handleTuitionChange}
                step="5000"
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="yearsSlider"
                className="block text-gray-700 font-medium mb-2"
              >
                Years to Graduation:{" "}
                <span id="yearsValue" className="text-yellow-700">
                  {years} years
                </span>
              </label>
              <input
                type="range"
                id="yearsSlider"
                min="2"
                max="6"
                value={years}
                onChange={handleYearsChange}
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="text-center mt-6">
              <p className="text-lg text-gray-700 mb-2">
                Potential ROI Over 10 Years:
              </p>
              <p
                id="roiResult"
                className="text-4xl font-extrabold text-green-700"
              >
                ₹{roiResult.toLocaleString()}+
              </p>
            </div>
          </div>
        </section>

        {/* Success Stories and Action Plan Section */}
        <section className="p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Star className="mr-3 text-yellow-500" />
            Inspiration & Next Steps
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Fictional Success Story */}
            <div>
              <h3 className="text-xl font-bold text-yellow-800 mb-3">
                From High School Coder to Software Engineer: Alex's Story
              </h3>
              <p className="text-gray-600 mb-4">
                Alex, a student with a love for puzzles and problem-solving,
                used our assessment to discover his natural aptitude for
                software development. Despite initially being unsure, his
                parents saw the data and supported his choice to pursue a
                Computer Science degree. Today, Alex is a thriving software
                engineer, building innovative apps and earning a great living.
              </p>
              <p className="text-sm italic text-gray-500">
                *This is a fictional archetype case study based on real-world
                career data and success patterns.*
              </p>
            </div>
            {/* Call to Action / Action Plan */}
            <div>
              <h3 className="text-xl font-bold text-yellow-800 mb-3">
                Ready to Help Your Child?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MessageCircle className="text-xl text-yellow-600 mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Start a Conversation
                    </h4>
                    <p className="text-gray-600">
                      Use our discussion prompts to talk about their career path
                      with confidence.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <BookOpen className="text-xl text-yellow-600 mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Explore Educational Resources
                    </h4>
                    <p className="text-gray-600">
                      We've linked to scholarship finders and articles to help
                      you plan for the future.
                    </p>
                  </div>
                </div>
                <a
                  href="#"
                  className="inline-block bg-yellow-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-yellow-700 transition duration-300"
                >
                  Schedule a Consultation
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ParentsDashboard;
