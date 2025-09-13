import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import CollegeCard from "../components/dashboard/CollegeCard";
import { mockCollegesData } from "../data/mockCollegesData";
import { FaSearch } from "react-icons/fa";

const CollegesPage = () => {
  const [colleges, setColleges] = useState(mockCollegesData);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filtered = mockCollegesData.filter(
      (college) =>
        college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setColleges(filtered);
  }, [searchTerm]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-grow container mx-auto p-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Explore Colleges</h1>
          <p className="text-gray-600 mt-2">
            Find the right government college for you in Madhya Pradesh.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-lg mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by college name or city..."
            className="w-full p-4 pl-12 text-lg border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
        </div>

        {/* College Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {colleges.length > 0 ? (
            colleges.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No colleges found matching your search.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CollegesPage;
