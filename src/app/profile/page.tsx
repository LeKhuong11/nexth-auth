"use client"

import React from 'react'
import { useAuth } from '../context-provider';
import { useRouter } from 'next/navigation';

function Profile() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const logout = async () => {
    const res = await fetch("/api/auth/logout", { method: "GET" });

    console.log(res);
    
    // setUser(null);
    // router.push("/login");
  };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
          <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">Profile</h1>
    
            <div className="flex flex-col items-center space-y-4">
              <img
                src="/avatar-default.jpg"
                alt="Avatar"
                className="w-24 h-24 rounded-full border"
              />
              <p className="text-lg font-semibold">{user?.name}</p>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-gray-500 text-sm">{user?.createdAt}</p>
            </div>
    
            <div className="mt-6 flex justify-center">
              <a
                href="/profile/settings"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Edit Profile
              </a>
            </div>
          </div>
          <button
            onClick={logout}
            className="absolute bottom-5 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      );
}

export default Profile