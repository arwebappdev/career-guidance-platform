import React, { useRef, useEffect } from "react";
import { FaMapMarkerAlt, FaBook, FaRupeeSign } from "react-icons/fa";
import { gsap } from "gsap";

const CollegeCard = ({ college }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    // Hover animations
    const card = cardRef.current;
    const img = imgRef.current;

    const enter = () => {
      gsap.to(img, { scale: 1.1, duration: 0.6, ease: "power3.out" });
      gsap.to(card, { y: -8, duration: 0.3, ease: "power2.out" });
    };

    const leave = () => {
      gsap.to(img, { scale: 1, duration: 0.6, ease: "power3.out" });
      gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
    };

    card.addEventListener("mouseenter", enter);
    card.addEventListener("mouseleave", leave);

    return () => {
      card.removeEventListener("mouseenter", enter);
      card.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="group bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          ref={imgRef}
          src={college.imageUrl}
          alt={`${college.name} campus`}
          className="w-full h-full object-cover transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 transition-opacity"></div>
        <div className="absolute bottom-4 left-4">
          <h3 className="text-2xl font-bold text-white drop-shadow-md">
            {college.name}
          </h3>
          <div className="flex items-center text-gray-200 mt-1 text-sm">
            <FaMapMarkerAlt className="mr-2 text-indigo-400" />
            <span>{college.location}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h4 className="font-semibold text-gray-700 mb-4 flex items-center text-lg">
          <FaBook className="mr-2 text-indigo-600" /> Popular Courses
        </h4>
        <div className="space-y-3">
          {college.courses.slice(0, 3).map((course, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded-lg hover:bg-indigo-50 transition-all"
            >
              <p className="text-gray-700 font-medium">{course.name}</p>
              <div className="flex items-center">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    course.level === "UG"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {course.level}
                </span>
                {course.fees && (
                  <span className="ml-4 text-gray-800 font-medium flex items-center">
                    <FaRupeeSign className="mr-1 text-sm" /> {course.fees}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-6 bg-indigo-600 text-white font-bold py-3 px-5 rounded-xl hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50">
          Explore College
        </button>
      </div>
    </div>
  );
};

export default CollegeCard;
