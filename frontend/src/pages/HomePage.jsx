import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/layout/Footer";
import {
  FiArrowRight,
  FiCheckCircle,
  FiAward,
  FiTrendingUp,
  FiSearch,
} from "react-icons/fi";
import { assets } from "../assets/assets";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HomePage = ({ user }) => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const howItWorksRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef(null);
  const finalCtaRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (hero) {
      // Parallax effect on scroll
      gsap.to(hero, {
        backgroundPosition: "0% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Animation for hero content
      const heroContent = hero.querySelector(".hero-content");
      if (heroContent) {
        gsap.fromTo(
          heroContent,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            delay: 0.3,
          }
        );
      }
    }
  }, []);

  useEffect(() => {
    const animateSection = (ref, selector = ".animate-item") => {
      if (ref.current) {
        const elements = ref.current.querySelectorAll(selector);
        if (elements.length > 0) {
          gsap.fromTo(
            elements,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ref.current,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }
    };

    const timer = setTimeout(() => {
      animateSection(howItWorksRef, ".step-card");
      animateSection(featuresRef, ".feature-item");
      animateSection(testimonialsRef, ".testimonial-card");
      animateSection(finalCtaRef, ".cta-content");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleQuizButtonClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      const userProfile = localStorage.getItem(`userProfile_${user.uid}`);
      if (userProfile) {
        navigate("/assessment");
      } else {
        navigate("/profile");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-grow">
        {/* Hero Section */}
        <div
          ref={heroRef}
          className="h-screen bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: `url(${assets.background})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="hero-content relative z-10 flex items-center justify-center h-full text-center px-4 text-white">
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-md">
                Find Your <span className="text-yellow-600">Future Path</span>,
                Today.
              </h1>
              <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto drop-shadow-sm">
                Stop the confusion. Our AI-powered guidance platform helps you
                discover the perfect career and education path based on your
                unique interests and strengths.
              </p>
              <div className="mt-10">
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
        <section ref={howItWorksRef} className="relative py-24 ">
          <div className="absolute inset-0 bg-white"></div>
          <div className="relative z-10">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16 animate-item">
                <h2 className="text-4xl md:text-4xl font-bold text-gray-800">
                  How It Works
                </h2>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                  A simple, three-step process to unlock your future potential.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-10 text-center">
                <div className="step-card p-8 bg-white rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                  <FiAward className="mx-auto text-yellow-600 h-12 w-12 mb-4" />
                  <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                    1. Take the Assessment
                  </h3>
                  <p className="text-gray-600">
                    Answer a series of questions to help us understand your
                    interests, skills, and personality.
                  </p>
                </div>
                <div className="step-card p-8 bg-white rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                  <FiSearch className="mx-auto text-yellow-600 h-12 w-12 mb-4" />
                  <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                    2. Get Your Results
                  </h3>
                  <p className="text-gray-600">
                    Receive a detailed report with personalized career and
                    college recommendations.
                  </p>
                </div>
                <div className="step-card p-8 bg-white rounded-xl shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
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
        <section ref={featuresRef} className="py-10 bg-gray-200">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="pr-8">
                <h2 className="feature-item text-4xl md:text-4xl font-bold text-gray-800 mb-6">
                  Why Choose Us?
                </h2>
                <div className="space-y-6">
                  <div className="feature-item flex items-start">
                    <FiCheckCircle className="text-yellow-600 h-7 w-7 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Personalized Recommendations
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Our AI algorithm provides recommendations tailored
                        specifically to you.
                      </p>
                    </div>
                  </div>
                  <div className="feature-item flex items-start">
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
                  <div className="feature-item flex items-start">
                    <FiCheckCircle className="text-yellow-600 h-7 w-7 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        Lifetime Access & Support
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Offer long-term value, showing you're a partner in their
                        career journey.
                      </p>
                    </div>
                  </div>
                  <div className="feature-item flex items-start">
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
              <div className="feature-item w-50 ">
                <img
                  src={assets.feature || "/placeholder.svg"}
                  alt="Feature"
                  className="rounded-md shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section ref={testimonialsRef} className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 animate-item">
              <h2 className="text-4xl md:text-4xl font-bold text-gray-800">
                What Our Users Say
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="testimonial-card bg-yellow-600 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                <p className="text-white mb-6 italic">
                  "This platform was a game-changer for me. I was so confused
                  about my career, but the assessment gave me clarity and
                  direction."
                </p>
                <p className="font-bold text-white text-right">- Atharva C.</p>
              </div>
              <div className="testimonial-card bg-yellow-600 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                <p className="text-white mb-6 italic">
                  "The college recommendations were spot on! I found the perfect
                  university that matched my interests and academic profile."
                </p>
                <p className="font-bold text-white text-right">- Kartik G.</p>
              </div>
              <div className="testimonial-card bg-yellow-600 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                <p className="text-white mb-6 italic">
                  "A fantastic tool for any student feeling lost about their
                  future. Highly recommended!"
                </p>
                <br />
                <p className="font-bold text-white text-right">- Anushka S.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section
          ref={finalCtaRef}
          className="py-24 bg-gray-200 text-black text-center"
        >
          <div className="container mx-auto px-6">
            <div className="cta-content">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Discover Your Future?
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto">
                Take the first step towards a fulfilling career. Our free
                assessment is waiting for you.
              </p>
              <button
                onClick={handleQuizButtonClick}
                className="inline-flex items-center justify-center bg-white text-yellow-700 font-bold text-lg px-8 py-4 rounded-full hover:bg-yellow-700 hover:text-white transition-transform duration-500 transform hover:scale-105 shadow-lg"
              >
                Start Your Journey Now
                <FiArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
