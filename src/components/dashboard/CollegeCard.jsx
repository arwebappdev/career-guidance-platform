import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const CollegeCard = ({ college }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-bold text-gray-800">{college.name}</h3>
      <div className="flex items-center text-gray-500 my-2">
        <FaMapMarkerAlt className="mr-2" />
        <span>{college.city}</span>
      </div>
      <div className="my-4">
        <h4 className="font-semibold text-gray-700 mb-2">Available Courses:</h4>
        <div className="flex flex-wrap gap-2">
          {college.courses.map((course) => (
            <span
              key={course}
              className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full"
            >
              {course}
            </span>
          ))}
        </div>
      </div>
      <button className="w-full mt-4 bg-gray-200 text-gray-800 font-semibold py-2 rounded-lg hover:bg-gray-300 transition-colors">
        View Details
      </button>
    </div>
  );
};

export default CollegeCard;
