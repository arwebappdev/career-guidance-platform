import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Sparkles,
  ArrowRight,
  Shield,
  Zap,
} from "lucide-react";

const FloatingElement = ({ children, delay = 0, className = "" }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    // Start visible but small, don't hide completely
    gsap.set(elementRef.current, { opacity: 0.3, scale: 0.8 });

    gsap.to(elementRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      delay,
      ease: "power2.out",
    });

    // Add floating animation after entrance
    gsap.to(elementRef.current, {
      y: "random(-15, 15)",
      x: "random(-10, 10)",
      rotation: "random(-5, 5)",
      duration: "random(3, 5)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: delay + 1.5, // Wait for entrance animation
    });
  }, [delay]);

  return (
    <div
      ref={elementRef}
      className={`absolute pointer-events-none ${className}`}
    >
      {children}
    </div>
  );
};

const LoginVisual = () => {
  const visualRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Ensure component is mounted before animating
    setMounted(true);

    const timer = setTimeout(() => {
      if (visualRef.current) {
        const children = Array.from(visualRef.current.children);
        if (children.length > 0) {
          gsap.from(children, {
            opacity: 0,
            scale: 0.9,
            y: 20,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.3,
            ease: "power2.out",
          });
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="hidden lg:flex flex-col items-center justify-center w-1/2 p-8 relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-700">
      {/* Floating background elements - only render when mounted */}
      {mounted && (
        <>
          <FloatingElement delay={0} className="top-10 left-10">
            <Shield className="w-8 h-8 text-white/40" />
          </FloatingElement>
          <FloatingElement delay={0.3} className="top-20 right-16">
            <Sparkles className="w-6 h-6 text-white/40" />
          </FloatingElement>
          <FloatingElement delay={0.6} className="bottom-20 left-16">
            <Zap className="w-10 h-10 text-white/40" />
          </FloatingElement>
          <FloatingElement delay={0.9} className="bottom-32 right-10">
            <Shield className="w-7 h-7 text-white/40" />
          </FloatingElement>
        </>
      )}

      <div ref={visualRef} className="text-center text-white z-10">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Secure Access</h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Your gateway to a personalized experience. Join thousands of users
            who trust our platform.
          </p>
        </div>

        <div className="space-y-4 text-left">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="text-white/90">End-to-end encryption</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="text-white/90">Multi-factor authentication</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="text-white/90">24/7 security monitoring</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginPage = ({ onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Refs for animation
  const formRef = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const inputRefs = useRef([]);

  // Mount and entrance animation
  useEffect(() => {
    setMounted(true);

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (containerRef.current) {
        // Start with visible but slightly hidden
        gsap.set(containerRef.current, { opacity: 0.1, y: 50, scale: 0.95 });

        gsap.to(containerRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        });
      }

      // Animate title
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out",
        });
      }

      // Animate form elements
      if (formRef.current) {
        const formChildren = Array.from(formRef.current.children);
        if (formChildren.length > 0) {
          gsap.from(formChildren, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.4,
            ease: "power2.out",
          });
        }
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // Handle view switching animation
  useEffect(() => {
    if (!mounted) return;

    if (formRef.current) {
      const formChildren = Array.from(formRef.current.children);
      if (formChildren.length > 0) {
        gsap.fromTo(
          formChildren,
          {
            opacity: 0.5,
            x: isLoginView ? -10 : 10,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out",
          }
        );
      }
    }
  }, [isLoginView, mounted]);

  const handleInputFocus = (index) => {
    if (inputRefs.current[index]) {
      gsap.to(inputRefs.current[index], {
        scale: 1.02,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleInputBlur = (index) => {
    if (inputRefs.current[index]) {
      gsap.to(inputRefs.current[index], {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    const submitBtn = document.querySelector(".submit-btn");
    if (submitBtn) {
      gsap.to(submitBtn, {
        scale: 0.98,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      });
    }

    // Simulate API call
    setTimeout(() => {
      console.log("Simulating login...");
      setIsLoading(false);
      if (onLogin) onLogin();
    }, 1500);
  };

  // Render with fallback visible state
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 font-sans relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl"></div>
      </div>

      <div
        ref={containerRef}
        className="flex flex-col lg:flex-row w-full max-w-6xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200/50 relative z-10"
        style={{ opacity: mounted ? undefined : 1 }} // Fallback opacity
      >
        <LoginVisual />

        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <div ref={titleRef} className="mb-8">
            <h2 className="text-4xl font-bold text-slate-800 mb-2">
              {isLoginView ? "Welcome Back!" : "Create Account"}
            </h2>
            <p className="text-slate-600 text-lg">
              {isLoginView
                ? "Sign in to continue your journey."
                : "Get started with us today!"}
            </p>
          </div>

          <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5 pointer-events-none" />
                <input
                  ref={(el) => (inputRefs.current[0] = el)}
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => handleInputFocus(0)}
                  onBlur={() => handleInputBlur(0)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-slate-800 placeholder-slate-500"
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5 pointer-events-none" />
                <input
                  ref={(el) => (inputRefs.current[1] = el)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => handleInputFocus(1)}
                  onBlur={() => handleInputBlur(1)}
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 text-slate-800 placeholder-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors z-10"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="submit-btn w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>{isLoginView ? "Sign In" : "Create Account"}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <div className="text-center">
              <p className="text-slate-600">
                {isLoginView
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLoginView(!isLoginView)}
                  className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors focus:outline-none"
                >
                  {isLoginView ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
