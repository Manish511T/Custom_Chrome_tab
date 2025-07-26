import React, { useState, useEffect } from 'react';

const defaultData = {
  name: 'Anonymous Hacker',
  email: 'hacker@darkweb.com',
  bio: 'Silent but deadly.',
  image: '', // base64
};

const UserProfile = () => {
  const [profile, setProfile] = useState(defaultData);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('hackerUserProfile');
    if (stored) setProfile(JSON.parse(stored));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({ ...profile, image: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSave = () => {
    localStorage.setItem('hackerUserProfile', JSON.stringify(profile));
    setEditing(false);
  };

  return (
    <div className="bg-[#0f0f0f] text-[#00ff00] font-mono p-6 rounded-xl border border-green-600 max-w-md shadow-xl">
      <h2 className="text-2xl text-center mb-4 border-b border-green-600 pb-2">[User Profile]</h2>
      
      <div className="flex flex-col items-center space-y-3 mb-4">
        <div className="w-24 h-24 rounded-full border-2 border-green-600 overflow-hidden">
          {profile.image ? (
            <img src={profile.image} alt="User" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-[#111] flex items-center justify-center text-green-400 text-xs">No Image</div>
          )}
        </div>
        {editing && (
          <input type="file" accept="image/*" onChange={handleImageUpload} className="text-xs text-green-500" />
        )}
      </div>

      <div className="space-y-2">
        <div>
          <label className="text-green-400">Name:</label><br />
          {editing ? (
            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="bg-transparent border border-green-700 px-2 py-1 w-full"
            />
          ) : (
            <p>{profile.name}</p>
          )}
        </div>

        <div>
          <label className="text-green-400">Email:</label><br />
          {editing ? (
            <input
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="bg-transparent border border-green-700 px-2 py-1 w-full"
            />
          ) : (
            <p>{profile.email}</p>
          )}
        </div>

        <div>
          <label className="text-green-400">Bio:</label><br />
          {editing ? (
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              rows={3}
              className="bg-transparent border border-green-700 px-2 py-1 w-full"
            />
          ) : (
            <p>{profile.bio}</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-700 px-4 py-1 rounded hover:bg-green-600 transition-all"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="bg-red-700 px-4 py-1 rounded hover:bg-red-600 transition-all"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="bg-green-800 px-4 py-1 rounded hover:bg-green-600 transition-all"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
