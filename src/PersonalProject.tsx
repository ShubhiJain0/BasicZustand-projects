import React from 'react'

const PersonalProject = () => {
  return (
    <div className="min-w-screen min-h-screen flex justify-between items-center bg-pink-300 p-8">
      <div className="w-[20%] h-[60%] bg-pink-200 rounded-2xl shadow-lg">
        <input type="text" className="px-4 py-2 rounded-md" />
      </div>
      <div className="w-[20%] h-[60%] bg-pink-200 rounded-2xl shadow-lg">
        <div className="bg-pink-700 w-4"></div>
      </div>
    </div>
  );
}

export default PersonalProject