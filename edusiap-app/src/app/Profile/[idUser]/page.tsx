"use client"
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Profile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'view' | 'edit'>('view');
  const [userData, setUserData] = useState({
    username: 'johndoe',
    fullName: 'John Doe',
    email: 'john@example.com',
    phoneNumber: '+1 (555) 123-4567',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    joinedDate: 'January 2023'
  });

  const handleSave = (updatedData: typeof userData) => {
    setUserData(updatedData);
    setActiveTab('view');
  };

  return (
    <div className="flex min-h-screen bg-orange-100">
      <Sidebar />
      <main className="flex-1 py-0 max-md:px-5 max-md:py-0 ml-[120px]">
        <Header />
        
        <div className="p-6 max-w-6xl mx-auto mt-30">
          {/* Profile Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
            <div className="flex space-x-4">
              <button 
                onClick={() => setActiveTab('view')}
                className={`px-4 py-2 rounded-lg ${activeTab === 'view' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700'}`}
              >
                View Profile
              </button>
              <button 
                onClick={() => setActiveTab('edit')}
                className={`px-4 py-2 rounded-lg ${activeTab === 'edit' ? 'bg-orange-500 text-white' : 'bg-white text-gray-700'}`}
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {activeTab === 'view' ? (
              <ProfileView userData={userData} />
            ) : (
              <ProfileEdit 
                userData={userData} 
                onSave={handleSave} 
                onCancel={() => setActiveTab('view')} 
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// Profile View Component
function ProfileView({ userData }: { userData: any }) {
  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Avatar */}
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-orange-200">
            <img 
              src={userData.avatar} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800">{userData.fullName}</h2>
          <p className="text-gray-500 text-center">{userData.username}</p>
          <p className="text-gray-500 text-center text-sm mt-2">Member since {userData.joinedDate}</p>
        </div>

        {/* Right Column - Details */}
        <div className="w-full md:w-2/3 space-y-6">
          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Username</p>
                <p className="text-gray-800 font-medium">@{userData.username}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Full Name</p>
                <p className="text-gray-800 font-medium">{userData.fullName}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Email</p>
                <p className="text-gray-800 font-medium">{userData.email}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Phone Number</p>
                <p className="text-gray-800 font-medium">{userData.phoneNumber}</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Account Settings</h3>
            <button className="text-orange-600 hover:underline mr-4">Change Password</button>
            <button className="text-orange-600 hover:underline">Privacy Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Profile Edit Component
function ProfileEdit({ userData, onSave, onCancel }: { 
  userData: any, 
  onSave: (data: any) => void, 
  onCancel: () => void 
}) {
  const [formData, setFormData] = useState(userData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Avatar */}
          <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-orange-200">
              <img 
                src={formData.avatar} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="text"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black text-sm"
              placeholder="Image URL"
            />
          </div>

          {/* Right Column - Form Fields */}
          <div className="w-full md:w-2/3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg text-black" 
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg text-black"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 border border-black rounded-lg text-black hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}