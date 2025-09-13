import { useState, useEffect, useRef } from "react";
import {
  User,
  Calendar,
  GraduationCap,
  Users,
  Sparkles,
  CheckCircle,
} from "lucide-react";

const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-xl animate-pulse"></div>
    <div
      className="absolute top-40 right-20 w-24 h-24 bg-emerald-400/20 rounded-full blur-lg animate-pulse"
      style={{ animationDelay: "1s" }}
    ></div>
    <div
      className="absolute bottom-32 left-1/4 w-40 h-40 bg-emerald-600/20 rounded-full blur-2xl animate-pulse"
      style={{ animationDelay: "2s" }}
    ></div>
    <div
      className="absolute bottom-20 right-1/3 w-28 h-28 bg-emerald-500/20 rounded-full blur-xl animate-pulse"
      style={{ animationDelay: "0.5s" }}
    ></div>
  </div>
);

const ProgressBar = ({ progress }) => {
  const progressRef = useRef(null);

  useEffect(() => {
    if (progressRef.current) {
      // Simple CSS transition instead of GSAP
      progressRef.current.style.width = `${progress}%`;
      progressRef.current.style.transition = "width 1.5s ease-out";
    }
  }, [progress]);

  return (
    <div className="w-full bg-slate-200 rounded-full h-2 mb-8 overflow-hidden">
      <div
        ref={progressRef}
        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full w-0 shadow-lg shadow-emerald-500/50"
        style={{
          boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)",
        }}
      />
    </div>
  );
};

const ProfileVisual = () => {
  const iconRef = useRef(null);
  const circleRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    // Simple CSS animations instead of GSAP
    if (iconRef.current) {
      iconRef.current.style.animation = "spin 20s linear infinite";
    }

    if (circleRef.current) {
      circleRef.current.style.animation = "pulse 2s ease-in-out infinite";
    }

    if (visualRef.current) {
      visualRef.current.style.background =
        "linear-gradient(135deg, #059669 0%, #10b981 50%, #047857 100%)";
      visualRef.current.style.backgroundColor = "#059669";
    }
  }, []);

  return (
    <div
      ref={visualRef}
      className="hidden lg:flex flex-col items-center justify-center w-1/2 p-12 text-center relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #059669 0%, #10b981 50%, #047857 100%) !important",
        backgroundColor: "#059669 !important",
        color: "#ffffff !important",
      }}
    >
      <AnimatedBackground />

      <div className="relative z-10">
        <h1
          className="text-5xl font-bold mb-6 text-balance text-white"
          style={{ color: "#ffffff !important" }}
        >
          Complete Your
          <span
            className="block text-white"
            style={{ color: "#ffffff !important" }}
          >
            Profile Journey
          </span>
        </h1>
        <p
          className="text-xl mb-12 leading-relaxed max-w-md text-white"
          style={{ color: "#ffffff !important" }}
        >
          Help us understand you better to provide personalized career guidance
          and unlock your potential.
        </p>

        <div className="relative">
          <div
            ref={circleRef}
            className="w-80 h-80 bg-gradient-to-br from-white/20 to-white/5 rounded-full shadow-2xl flex items-center justify-center backdrop-blur-sm border border-white/20"
          >
            <div
              ref={iconRef}
              className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md"
            >
              <Sparkles
                className="w-16 h-16 text-white"
                style={{ color: "#ffffff" }}
              />
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-bounce">
            <GraduationCap
              className="w-8 h-8 text-white"
              style={{ color: "#ffffff" }}
            />
          </div>
          <div
            className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-bounce"
            style={{ animationDelay: "1s" }}
          >
            <Users
              className="w-6 h-6 text-white"
              style={{ color: "#ffffff" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FormField = ({ children, delay = 0 }) => {
  const fieldRef = useRef(null);

  useEffect(() => {
    if (fieldRef.current) {
      // Simple fade-in animation
      fieldRef.current.style.opacity = "0";
      fieldRef.current.style.transform = "translateY(30px)";
      fieldRef.current.style.transition = "all 0.8s ease-out";

      setTimeout(() => {
        fieldRef.current.style.opacity = "1";
        fieldRef.current.style.transform = "translateY(0)";
      }, delay * 1000);
    }
  }, [delay]);

  return (
    <div ref={fieldRef} className="form-field">
      {children}
    </div>
  );
};

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    education: "",
  });
  const [progress, setProgress] = useState(0);

  const containerRef = useRef(null);
  const formRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    // Calculate progress based on filled fields
    const filledFields = Object.values(formData).filter(
      (value) => value !== ""
    ).length;
    const newProgress = (filledFields / 4) * 100;
    setProgress(newProgress);
  }, [formData]);

  useEffect(() => {
    // Initial animations with CSS
    if (containerRef.current) {
      containerRef.current.style.opacity = "0";
      containerRef.current.style.transform = "scale(0.9)";
      containerRef.current.style.transition = "all 1s ease-out";

      setTimeout(() => {
        containerRef.current.style.opacity = "1";
        containerRef.current.style.transform = "scale(1)";
      }, 100);
    }

    if (titleRef.current) {
      titleRef.current.style.opacity = "0";
      titleRef.current.style.transform = "translateY(-30px)";
      titleRef.current.style.transition = "all 1s ease-out";

      setTimeout(() => {
        titleRef.current.style.opacity = "1";
        titleRef.current.style.transform = "translateY(0)";
      }, 300);
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Simple scale animation
    const input = document.querySelector(`[name="${field}"]`);
    if (input) {
      input.style.transform = "scale(1.02)";
      setTimeout(() => {
        input.style.transform = "scale(1)";
      }, 100);
      input.style.transition = "transform 0.1s ease";
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Success animation
    if (formRef.current) {
      formRef.current.style.transform = "scale(1.05)";
      setTimeout(() => {
        formRef.current.style.transform = "scale(1)";
        console.log("Profile Completed", formData);
      }, 300);
      formRef.current.style.transition = "transform 0.3s ease";
    }
  };

  return (
    <div className="flex items-center h-screen justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 font-sans relative overflow-hidden">
      <div
        ref={containerRef}
        className="flex w-full max-w-6xl bg-gradient-to-r from-white to-emerald-50/50 rounded-2xl shadow-2xl overflow-hidden relative z-10 border border-emerald-200"
      >
        <ProfileVisual />

        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-gradient-to-br from-white/95 to-emerald-50/30">
          <form
            ref={formRef}
            onSubmit={handleFormSubmit}
            className="flex flex-col gap-6"
          >
            <div className="mb-8">
              <h2
                ref={titleRef}
                className="text-4xl font-bold text-slate-800 mb-4 text-balance"
              >
                Tell Us About
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-500">
                  Yourself
                </span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                This information will help us tailor your experience and provide
                personalized recommendations.
              </p>
              <ProgressBar progress={progress} />
            </div>

            <FormField delay={0.5}>
              <div className="relative group">
                <User
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 text-slate-800 placeholder:text-slate-400 hover:border-emerald-300"
                />
              </div>
            </FormField>

            <FormField delay={0.7}>
              <div className="relative group">
                <Calendar
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors"
                  size={20}
                />
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    handleInputChange("dateOfBirth", e.target.value)
                  }
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 text-slate-800"
                />
              </div>
            </FormField>

            <FormField delay={0.9}>
              <div className="relative group">
                <Users
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors"
                  size={20}
                />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 text-slate-800 appearance-none cursor-pointer"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </div>
            </FormField>

            <FormField delay={1.1}>
              <div className="relative group">
                <GraduationCap
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors"
                  size={20}
                />
                <select
                  name="education"
                  value={formData.education}
                  onChange={(e) =>
                    handleInputChange("education", e.target.value)
                  }
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300 text-slate-800 appearance-none cursor-pointer"
                >
                  <option value="">Current Education Status</option>
                  <option value="10th">10th Grade</option>
                  <option value="12th">12th Grade</option>
                  <option value="doctorate">Doctorate</option>
                </select>
              </div>
            </FormField>

            <FormField delay={1.3}>
              <button
                type="submit"
                className="group relative bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold py-4 px-8 mt-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden hover:from-emerald-700 hover:to-emerald-600"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <CheckCircle size={20} />
                  Complete Profile
                </span>
              </button>
            </FormField>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
