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
  Phone,
} from "lucide-react";
import { auth, googleProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
} from "firebase/auth";


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
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);

  const formRef = useRef(null);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const inputRefs = useRef([]);
  
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {},
        'expired-callback': () => {}
      });
    }
  };

  useEffect(() => {
    if (loginMethod === 'mobile') {
      setupRecaptcha();
    }
  }, [loginMethod]);

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
  }, [isLoginView, mounted, loginMethod]);

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
    try {
      let userCredential;
      if (loginMethod === "email") {
        if (!email || !password) {
          setError("Please enter both email and password.");
          setIsLoading(false);
          return;
        }
        userCredential = isLoginView
          ? await signInWithEmailAndPassword(auth, email, password)
          : await createUserWithEmailAndPassword(auth, email, password);
      } else {
        if (!otp) {
          setError("Please enter the OTP.");
          setIsLoading(false);
          return;
        }
        userCredential = await confirmationResult.confirm(otp);
      }
      onLogin(userCredential.user);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setError("");
    if (!mobile) {
      setError("Please enter a mobile number.");
      return;
    }
    setIsLoading(true);
    try {
      let sanitizedMobile = mobile.replace(/[^0-9]/g, '');
      if (sanitizedMobile.length === 10) {
        sanitizedMobile = '91' + sanitizedMobile;
      }
      const formattedMobile = `+${sanitizedMobile}`;
      const verifier = window.recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(auth, formattedMobile, verifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      alert("OTP sent successfully!");
    } catch (error) {
      setError("Failed to send OTP. Please check the number and try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      onLogin(result.user);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLoginMethod = (method) => {
    setError("");
    setLoginMethod(method);
    setOtpSent(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 font-sans overflow-hidden">
      <div id="recaptcha-container"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl"></div>
      </div>
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
          <div className="flex justify-center mb-4">
            <button
              onClick={() => toggleLoginMethod("email")}
              className={`px-4 py-2 rounded-l-lg text-sm ${loginMethod === "email" ? "bg-yellow-600 text-black" : "bg-slate-200 text-slate-800"}`}
            >
              Email
            </button>
            <button
              onClick={() => toggleLoginMethod("mobile")}
              className={`px-4 py-2 rounded-r-lg text-sm ${loginMethod === "mobile" ? "bg-yellow-600 text-black" : "bg-slate-200 text-slate-800"}`}
            >
              Mobile
            </button>
          </div>
          <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-4">
            {loginMethod === "email" ? (
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
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <input
                    ref={(el) => (inputRefs.current[0] = el)}
                    type="tel"
                    placeholder="Mobile Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    onFocus={() => handleInputFocus(0)}
                    onBlur={() => handleInputBlur(0)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-600 text-sm"
                    disabled={otpSent}
                  />
                </div>
                {otpSent && (
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />
                    <input
                      ref={(el) => (inputRefs.current[1] = el)}
                      type="text"
                      placeholder="OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      onFocus={() => handleInputFocus(1)}
                      onBlur={() => handleInputBlur(1)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-yellow-600 text-sm"
                    />
                  </div>
                )}
                {!otpSent && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={isLoading}
                    className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded-xl"
                  >
                    {isLoading ? 'Sending...' : 'Send OTP'}
                  </button>
                )}
              </div>
            )}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-xs font-medium">{error}</p>
              </div>
            )}
            {(loginMethod === 'email' || otpSent) && (
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
            )}
          </form>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-slate-300"></div>
            <span className="mx-4 text-xs text-slate-500">OR</span>
            <div className="flex-grow border-t border-slate-300"></div>
          </div>
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-semibold py-3 rounded-xl flex items-center justify-center text-sm"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
              <path fill="#FF3D00" d="M6.306 14.691c-1.56 3.12-2.306 6.641-2.306 10.309s.746 7.189 2.306 10.309l7.306-5.688C13.254 27.87 13 25.973 13 24s.254-3.87 1.611-5.622l-7.305-5.687z" />
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.022 35.882 44 30.225 44 24c0-1.341-.138-2.65-.389-3.917z" />
            </svg>
            <span>Sign in with Google</span>
          </button>
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