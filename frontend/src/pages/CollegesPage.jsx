import React, { useState, useEffect, useRef } from "react";
import Footer from "../components/layout/Footer";
import CollegeCard from "../components/dashboard/CollegeCard";
import { FaSearch } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CollegesPage = () => {
  const [colleges, setColleges] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const main = useRef(null); // A ref for the main container for context

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/colleges?search=${searchTerm}`);
        if (response.ok) {
          const data = await response.json();
          setColleges(data);
        } else {
          console.error("Failed to fetch colleges");
        }
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    };

    fetchColleges();
  }, [searchTerm]);

  useEffect(() => {
    // 1. Create a GSAP context
    const ctx = gsap.context(() => {
      // All GSAP code goes inside here

      // Hero Section Animation
      gsap.from(".hero-anim", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Search bar animation
      gsap.from(".search-anim", {
        y: 30,
        opacity: 0,
        delay: 0.5,
        duration: 1,
        ease: "power3.out",
      });

      // Cards animation on scroll
      gsap.from(".card-anim", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2, // Use stagger for a cleaner effect than manual delay
        scrollTrigger: {
          trigger: ".card-grid-anim", // Trigger based on the grid container
          start: "top 80%",
        },
        ease: "power3.out",
      });
    }, main); // 2. Scope the context to our main component element

    // 3. Return a cleanup function
    return () => ctx.revert(); // This will clean up all animations and ScrollTriggers when the component re-renders
  }, [colleges]); // The dependency array is correct, we just needed the cleanup

  return (
    // Add the ref and a class to the main container
    <div
      ref={main}
      className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50"
    >
      <main className="flex-grow container mx-auto px-6 py-12">
        {/* Add a class for GSAP to target */}
        <div className="hero-anim text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 drop-shadow-md">
            🎓 Explore <span className="text-yellow-600">Colleges</span>
          </h1>
          <p className="text-gray-600 mt-6 max-w-2xl mx-auto text-lg">
            Find the best government colleges across{" "}
            <span className="font-semibold text-yellow-600">
              Madhya Pradesh
            </span>{" "}
            and explore popular courses.
          </p>
        </div>

        {/* Add a class for GSAP to target */}
        <div className="search-anim relative mb-14 max-w-xl mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by college name or city..."
            className="w-full p-4 pl-14 text-lg border border-gray-300 rounded-2xl shadow-md focus:ring-4 focus:ring-yellow-600 focus:outline-none transition-all"
          />
          <FaSearch className="absolute top-1/2 left-5 -translate-y-1/2 text-gray-400 text-lg" />
        </div>

        {/* Add a class for GSAP to target */}
        <div
          className="
    card-grid-anim 
    grid 
    grid-cols-1 
    sm:grid-cols-2 
    md:grid-cols-2 
    lg:grid-cols-2 
    xl:grid-cols-3 
    2xl:grid-cols-4
    gap-6 
    sm:gap-8 
    lg:gap-10
    place-items-center
  "
        >
          {colleges.length > 0 ? (
            colleges.map((college) => (
              <div key={college.id} className="card-anim w-full max-w-sm">
                <CollegeCard college={college} />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full text-lg">
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