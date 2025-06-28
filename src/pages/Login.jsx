// src/pages/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
      window.location.href = '/dashboard';
    } catch (err) {
      alert(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-4">🔐 Login to CinMate</h2>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full mb-3 p-2 rounded bg-gray-700 text-white" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full mb-4 p-2 rounded bg-gray-700 text-white" />
        <button type="submit" className="w-full bg-red-600 py-2 rounded hover:bg-red-700 transition text-white">Login</button>
      </form>
    </div>
  );
};

export default Login;