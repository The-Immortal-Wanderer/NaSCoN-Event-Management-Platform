import React from "react";
import { Link } from "react-router-dom";

// Placeholder: Implement API call to fetch user's registrations
function MyRegistrations() {
  return (
    <div className="max-w-4xl mx-auto pt-28 pb-14 px-4">
      <div className="flex gap-4 mb-6">
        <Link to="/" className="px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow hover:scale-105 transition-all">Home</Link>
        <Link to="/events" className="px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-amber-400 to-purple-900 text-white shadow hover:scale-105 transition-all">Events</Link>
      </div>
      <h1 className="font-fraunces text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-amber-400 mb-8">
        My Registrations
      </h1>
      <div className="bg-white/80 rounded-2xl shadow-lg border border-amber-100 p-8">
        {/* Map over registrations here */}
        <div className="text-gray-500">Your event registrations will appear here.</div>
      </div>
    </div>
  );
}

export default MyRegistrations;
