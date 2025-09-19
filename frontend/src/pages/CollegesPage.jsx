import React, { useState, useEffect, useRef } from "react";
import Footer from "../components/layout/Footer";
import CollegeCard from "../components/dashboard/CollegeCard";
import { mockCollegesData } from "../data/mockCollegesData";
import { FaSearch } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CollegesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const main = useRef(null);

  // Correct approach: Derive filtered data directly from searchTerm
  const filteredColleges = mockCollegesData.filter(
    (college) =>
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-anim", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".search-anim", {
        y: 30,
        opacity: 0,
        delay: 0.5,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".card-anim", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".card-grid-anim",
          start: "top 80%",
        },
        ease: "power3.out",
      });
    }, main);

    return () => ctx.revert();
  }, [searchTerm]); // Now the GSAP animation runs whenever searchTerm changes

  return (
    <div
      ref={main}
      className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50"
    >
      <main className="flex-grow container mx-auto px-6 py-12">
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
          {filteredColleges.length > 0 ? (
            filteredColleges.map((college) => (
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
