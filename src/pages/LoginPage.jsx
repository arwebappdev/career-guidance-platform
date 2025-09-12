import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { assets } from "../assets/assets";

const LoginVisual = () => (
  <div className="hidden lg:flex flex-col items-center justify-center w-1/2 p-5">
    <img src={assets.poster} alt="" className="rounded-xl shadow-lg" />
  </div>
);

const LoginPage = ({ onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Refs for animation
  const formRef = useRef(null);
  const containerRef = useRef(null);

  // Animate entrance on mount
  useEffect(() => {
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });

    gsap.from(formRef.current.children, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.5,
      ease: "power3.out",
    });
  }, []);

  // Animate switching between login/signup
  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }
  }, [isLoginView]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    console.log("Simulating login...");
    onLogin();
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center font-sans p-4 z-[51]"
      style={{ backgroundImage: `url(${assets.image})` }}
    >
      <div
        ref={containerRef}
        className="flex flex-col lg:flex-row w-xl max-w-sm lg:max-w-4xl bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
      >
        <LoginVisual />
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <form
            ref={formRef}
            onSubmit={handleFormSubmit}
            className="flex flex-col gap-4"
          >
            <h2 className="form-item text-4xl font-bold text-gray-800 mb-2">
              {isLoginView ? "Welcome Back!" : "Create Account"}
            </h2>
            <p className="form-item text-gray-500 mb-4">
              {isLoginView
                ? "Sign in to continue."
                : "Get started with us today!"}
            </p>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-item p-3 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 transition"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-item p-3 bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:border-indigo-500 transition"
            />
            {error && (
              <p className="form-item text-center text-sm font-semibold text-red-800 bg-red-100 p-2 rounded-md">
                {error}
              </p>
            )}
            <button
              type="submit"
              className="form-item bg-indigo-600 text-white font-bold p-3 mt-2 rounded-md hover:bg-indigo-700 transition-transform transform hover:scale-105"
            >
              {isLoginView ? "Login" : "Sign Up"}
            </button>
          </form>
          <p className="form-item mt-8 text-center text-gray-600">
            {isLoginView
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              type="button"
              onClick={() => setIsLoginView(!isLoginView)}
              className="font-semibold text-indigo-600 hover:underline focus:outline-none"
            >
              {isLoginView ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
