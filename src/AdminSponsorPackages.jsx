import React, { useState } from "react";
import { Link } from "react-router-dom";

function AdminSponsorPackages() {
  const [name, setName] = useState("");
  const [perks, setPerks] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddPackage = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/sponsorship/package", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
        },
        body: JSON.stringify({ name, perks, price }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Sponsorship package added successfully!");
        setName("");
        setPerks("");
        setPrice("");
      } else {
        setMessage(result.message || "Failed to add sponsorship package.");
      }
    } catch (error) {
      setMessage("An error occurred while adding the sponsorship package.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pt-28 pb-14 px-4">
      <div className="flex gap-4 mb-6">
        <Link
          to="/"
          className="px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow hover:scale-105 transition-all"
        >
          Home
        </Link>
        <Link
          to="/dashboard"
          className="px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-amber-400 to-purple-900 text-white shadow hover:scale-105 transition-all"
        >
          Dashboard
        </Link>
      </div>
      <h1 className="font-fraunces text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 to-amber-400 mb-8">
        Add Sponsorship Package
      </h1>
      {message && <div className="mb-4 text-center text-green-600">{message}</div>}
      <form onSubmit={handleAddPackage} className="bg-white/80 backdrop-blur-xl shadow-lg border border-amber-100 p-6 rounded-2xl">
        <div className="mb-4">
          <label className="block text-purple-900 font-bold mb-2" htmlFor="name">
            Package Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-900"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-purple-900 font-bold mb-2" htmlFor="perks">
            Perks
          </label>
          <textarea
            id="perks"
            value={perks}
            onChange={(e) => setPerks(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-900"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-purple-900 font-bold mb-2" htmlFor="price">
            Price (in Rs.)
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-900"
            required
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-purple-900 to-amber-400 text-white shadow-lg hover:scale-105 transition-all"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Package"}
        </button>
      </form>
    </div>
  );
}

export default AdminSponsorPackages;