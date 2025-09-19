import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { assets } from '../assets/assets'
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
    gsap.set(elementRef.current, { opacity: 0.3, scale: 0.8 });
    gsap.to(elementRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      delay,
      ease: "power2.out",
    });
    gsap.to(elementRef.current, {
      y: "random(-15, 15)",
      x: "random(-10, 10)",
      rotation: "random(-5, 5)",
      duration: "random(3, 5)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: delay + 1.5,
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
    <div className="hidden lg:flex flex-col items-center justify-center w-1/2 p-8 relative overflow-hidden bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-700">
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
          <div className="w-52 h-16 m-auto mb-6 bg-white rounded-xl flex items-center justify-center ">
            <img src={assets.logo1} alt="" className="w-full"/>
          </div>
          <p className="text-xl text-white/90 leading-relaxed">
            Your gateway to a personalized experience. Join thousands of users who trust our platform.
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

  const formRef = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const inputRefs = useRef([]);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      if (containerRef.current) {
        gsap.set(containerRef.current, { opacity: 0.1, y: 50, scale: 0.95 });
        gsap.to(containerRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
        });
      }
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out",
        });
      }
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

  useEffect(() => {
    if (!mounted) return;
    if (formRef.current) {
      const formChildren = Array.from(formRef.current.children);
      if (formChildren.length > 0) {
        gsap.fromTo(
          formChildren,
          { opacity: 0.5, x: isLoginView ? -10 : 10 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
        );
      }
    }
  }, [isLoginView, mounted]);

  const handleInputFocus = (index) => {
    if (inputRefs.current[index]) {
      gsap.to(inputRefs.current[index], { scale: 1.02, duration: 0.2, ease: "power2.out" });
    }
  };

  const handleInputBlur = (index) => {
    if (inputRefs.current[index]) {
      gsap.to(inputRefs.current[index], { scale: 1, duration: 0.2, ease: "power2.out" });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const url = isLoginView ? 'http://127.0.0.1:5000/api/login' : 'http://127.0.0.1:5000/api/register';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLogin(data.user);
      } else {
        setError(data.error || 'An error occurred.');
      }
    } catch (error) {
      setError('Failed to connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 font-sans overflow-hidden">
      <div
        ref={containerRef}
        className="flex flex-col lg:flex-row w-full max-w-5xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200/50"
        style={{ opacity: mounted ? undefined : 1 }}
      >
        <LoginVisual />
        <div className="w-full lg:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
          <div ref={titleRef} className="mb-6">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              {isLoginView ? "Welcome Back!" : "Create Account"}
            </h2>
            <p className="text-slate-600">
              {isLoginView ? "Sign in to continue." : "Get started with us today!"}
            </p>
          </div>
          <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  ref={(el) => (inputRefs.current[0] = el)}
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => handleInputFocus(0)}
                  onBlur={() => handleInputBlur(0)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-600 text-sm"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                <input
                  ref={(el) => (inputRefs.current[1] = el)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => handleInputFocus(1)}
                  onBlur={() => handleInputBlur(1)}
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-600 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-xs font-medium">{error}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>{isLoginView ? "Sign In" : "Create Account"}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </form>
          <div className="text-center mt-4">
            <p className="text-slate-600 text-sm">
              {isLoginView ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLoginView(!isLoginView)}
                className="font-semibold text-yellow-600 hover:text-yellow-700"
              >
                {isLoginView ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;