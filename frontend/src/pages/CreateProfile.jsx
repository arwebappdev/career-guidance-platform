import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const CreateProfile = ({ onProfileCreated }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    academicStatus: '',
    country: '',
    district: '',
    dob: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in formData) {
      if (formData[key] === '') {
        setError("Please fill out all fields.");
        return;
      }
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:5000/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          onProfileCreated();
        }, 1500);
      } else {
        setError(data.error || 'An error occurred.');
      }
    } catch (err) {
      setError("Failed to save profile. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-slate-50 h-screen flex items-center justify-center text-center p-4">
        <div>
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-slate-800">Profile Created!</h1>
          <p className="text-slate-500 mt-2">Redirecting you to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Create Your Profile</h1>
        <p className="text-slate-500 mb-6">This information will be saved to your account.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} className="w-full p-3 bg-slate-100 rounded-lg focus:ring-2 focus:ring-yellow-500" />
            <select name="gender" onChange={handleChange} className="w-full p-3 bg-slate-100 rounded-lg focus:ring-2 focus:ring-yellow-500">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <select name="academicStatus" onChange={handleChange} className="w-full p-3 bg-slate-100 rounded-lg focus:ring-2 focus:ring-yellow-500">
              <option value="">Academic Status</option>
              <option value="high-school">High School</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="graduate">Graduate</option>
              <option value="other">Other</option>
            </select>
            <input type="date" name="dob" placeholder="Date of Birth" onChange={handleChange} className="w-full p-3 bg-slate-100 rounded-lg focus:ring-2 focus:ring-yellow-500" />
            <input type="text" name="country" placeholder="Country" onChange={handleChange} className="w-full p-3 bg-slate-100 rounded-lg focus:ring-2 focus:ring-yellow-500" />
            <input type="text" name="district" placeholder="District / State" onChange={handleChange} className="w-full p-3 bg-slate-100 rounded-lg focus:ring-2 focus:ring-yellow-500" />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" disabled={isLoading} className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50">
            {isLoading ? 'Saving...' : 'Save and Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;