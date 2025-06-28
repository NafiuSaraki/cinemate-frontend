// src/components/Navbar.jsx
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
   const { toggleTheme, dark } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-wide">
          🎬 Cin<span className="text-yellow-400">Mate</span>
        </div>

        <div className="space-x-6 hidden md:flex">
          <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
          <Link to="/trending" className="hover:text-yellow-400 transition">Trending</Link>
          <Link to="/login" className="hover:text-yellow-400 transition">Login</Link>
          <Link to="/register" className="bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-300">Register</Link>
        </div>

        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
         <button
        onClick={toggleTheme}
        className="px-3 py-1 rounded bg-yellow-400 text-black"
      >
        {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>

      {menuOpen && (
        <div className="md:hidden px-4 pb-3 space-y-2">
          <Link to="/" className="block hover:text-yellow-400 transition">Home</Link>
          <Link to="/trending" className="block hover:text-yellow-400 transition">Trending</Link>
          <Link to="/login" className="block hover:text-yellow-400 transition">Login</Link>
          <Link to="/register" className="block bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-300">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;