import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("/api/user/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setUser(res.data))
    .catch(err => console.error(err));
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">User Profile</h2>
      <p><strong>Name:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Favorites:</strong> {user.favorites.length} movies</p>
    </div>
  );
};

export default Profile;