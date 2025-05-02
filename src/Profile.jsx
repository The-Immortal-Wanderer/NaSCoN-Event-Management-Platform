import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Replace with actual API/user context
    try {
      setUser(JSON.parse(localStorage.getItem("user")));
    } catch {}
  }, []);

  if (!user) return <div className="pt-28 text-lg text-gray-500">Loading profile...</div>;

  return (
    <div className="max-w-xl mx-auto pt-28 pb-14 px-4">
      <h1 className="font-fraunces text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-amber-400 mb-8">
        My Profile
      </h1>
      <div className="flex gap-4 mb-6">
        <Link to="/" className="px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow hover:scale-105 transition-all">Home</Link>
        <Link to="/dashboard" className="px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-amber-400 to-purple-900 text-white shadow hover:scale-105 transition-all">Dashboard</Link>
      </div>
      <div className="bg-white/80 rounded-2xl shadow-lg border border-amber-100 p-8">
        <div className="mb-4">
          <span className="font-bold text-purple-900">Name:</span> {user.name}
        </div>
        <div className="mb-4">
          <span className="font-bold text-purple-900">Email:</span> {user.email}
        </div>
        <div className="mb-4">
          <span className="font-bold text-purple-900">Role:</span> {user.role}
        </div>
        <div className="mb-4">
          <span className="font-bold text-purple-900">Contact:</span> {user.contact}
        </div>
      </div>
    </div>
  );
}

export default Profile;
