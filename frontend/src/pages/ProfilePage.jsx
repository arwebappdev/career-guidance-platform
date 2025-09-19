import React, { useState, useEffect } from 'react';
import CreateProfile from './CreateProfile';

const ProfileDashboard = ({ profileData }) => {
  const profileCompletion = 60;

  return (
    <div className="bg-slate-50 h-screen flex flex-col">
      <div className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="w-full max-w-6xl">
          <header className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Your Profile</h1>
            <p className="text-slate-500 mt-1">Manage your account settings and track your progress.</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
              <img
                src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${profileData.fullName}`}
                alt="User Avatar"
                className="w-24 h-24 rounded-full border-4 border-yellow-400 object-cover"
              />
              <h2 className="text-xl font-semibold text-slate-800 mt-4">{profileData.fullName}</h2>
              <p className="text-slate-500 text-sm">{profileData.email}</p>
              <p className="text-xs text-slate-400 mt-2">Date of Birth: {profileData.dob}</p>
              <button className="mt-4 w-full bg-yellow-500 text-white font-semibold py-2 rounded-lg hover:bg-yellow-600 transition-colors text-sm">
                Edit Profile
              </button>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="font-bold text-slate-800 mb-1">Complete Your Profile</h3>
                <p className='text-sm text-slate-500 mb-4'>Provide more details to get personalized recommendations.</p>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${profileCompletion}%` }}></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>{profileCompletion}% Complete</span>
                  <a href="#" className="font-semibold text-yellow-600 hover:underline">Continue</a>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="font-bold text-slate-800 mb-4">Your Progress</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">3</p>
                    <p className="text-sm text-slate-600">Assessments Taken</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">12</p>
                    <p className="text-sm text-slate-600">Colleges Saved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/profile');
      if (response.ok) {
        const data = await response.json();
        if (Object.keys(data).length > 0) {
          setProfile(data);
        }
        else {
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkProfile();
  }, []);

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading Profile...</div>;
  }
  
  return profile 
    ? <ProfileDashboard profileData={profile} /> 
    : <CreateProfile onProfileCreated={checkProfile} />;
};

export default ProfilePage;