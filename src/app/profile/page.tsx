import React from 'react'

function Profile() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">Profile</h1>
    
            <div className="flex flex-col items-center space-y-4">
              <img
                src="/avatar-default.jpg"
                alt="Avatar"
                className="w-24 h-24 rounded-full border"
              />
              <p className="text-lg font-semibold">Khuong</p>
              <p className="text-gray-600">11lekhuong@gmail.com</p>
              <p className="text-gray-500 text-sm">Joined: 11/02/2020</p>
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
        </div>
      );
}

export default Profile