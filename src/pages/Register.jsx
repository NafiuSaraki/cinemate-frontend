// src/pages/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/register', {
        username,
        email,
        password,
      });
      localStorage.setItem('token', res.data.token);
      alert('Registration successful!');
      window.location.href = '/dashboard';
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed!');
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <form onSubmit={handleRegister} className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-white mb-4">📝 Register for CinMate</h2>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="w-full mb-3 p-2 rounded bg-gray-700 text-white" />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full mb-3 p-2 rounded bg-gray-700 text-white" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full mb-4 p-2 rounded bg-gray-700 text-white" />
        <button type="submit" className="w-full bg-green-600 py-2 rounded hover:bg-green-700 transition text-white">Register</button>
      </form>
    </div>
  );
};

export default Register;