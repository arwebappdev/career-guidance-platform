import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import CollegesPage from "./pages/CollegesPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import AssessmentPage from "./pages/AssessmentPage";
import Header from "./components/layout/Header";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AboutPage = () => (
  <div className="container mx-auto p-8">
    <h1 className="text-3xl font-bold">About Us</h1>
    <p className="mt-4">Information about your company...</p>
  </div>
);

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = (user) => {
    setUser(user);
    navigate("/");
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Clear the user's profile from localStorage on logout
      if (user) {
        localStorage.removeItem(`userProfile_${user.uid}`);
      }
      setUser(null);
      navigate("/login");
    });
  };

  const showHeader = location.pathname !== "/login";

  return (
    <>
      {showHeader && <Header user={user} onLogout={handleLogout} />}
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        {/* 👇 Pass user state to HomePage */}
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/colleges" element={<CollegesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
}

export default App;