import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaUserEdit } from "react-icons/fa";

const ProfileVisual = () => (
  <div className="hidden lg:flex flex-col items-center justify-center w-1/2 bg-blue-700 text-white p-12 text-center">
    <h1 className="text-4xl font-bold mb-4">Complete Your Profile</h1>
    <p className="text-lg text-gray-200 mb-8">
      Help us understand you better to provide the best career guidance.
    </p>
    <div className="w-64 h-64 bg-blue-500 rounded-full shadow-lg flex items-center justify-center">
      <FaUserEdit className="text-white text-8xl" />
    </div>
  </div>
);

const ProfilePage = () => {
  const containerRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    // Animate the whole card container when it mounts
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    // Animate form items on mount
    if (formRef.current) {
      gsap.fromTo(
        formRef.current.querySelectorAll(".form-item"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.12,
        }
      );
    }
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle profile completion logic here
    console.log("Profile Completed");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-sans">
      <div
        ref={containerRef}
        className="flex w-full max-w-4xl min-h-[550px] bg-white rounded-lg shadow-2xl overflow-hidden"
      >
        {/* Left Visual*/}
        <ProfileVisual />

        {/* Right Side Form*/}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <form
            ref={formRef}
            onSubmit={handleFormSubmit}
            className="flex flex-col gap-4"
          >
            <h2 className="form-item text-3xl font-bold text-gray-800 mb-2">
              Tell Us About Yourself
            </h2>
            <p className="form-item text-gray-500 mb-6">
              This information will help us tailor your experience.
            </p>

            <input
              type="text"
              placeholder="Full Name"
              className="form-item p-3 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 transition"
            />
            <input
              type="date"
              placeholder="Date of Birth"
              className="form-item p-3 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 transition"
            />
            <select className="form-item p-3 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 transition">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <select className="form-item p-3 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 transition">
              <option value="">Current Education Status</option>
              <option value="10th">10th Grade</option>
              <option value="12th">12th Grade</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="postgraduate">Postgraduate</option>
            </select>

            <button
              type="submit"
              className="form-item bg-blue-600 text-white font-bold p-3 mt-4 rounded-md hover:bg-blue-700 transition-transform transform hover:scale-105"
            >
              Complete Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
