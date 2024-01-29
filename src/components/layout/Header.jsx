import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <a href="#" className="text-xl font-bold">YourAppName</a>
        <div className="flex items-center">
          <a href={"/"} className="text-white px-3 py-2 rounded-md text-sm font-medium">Home</a>
          <a href={"/register"} className="text-white px-3 py-2 rounded-md text-sm font-medium">Register</a>
          <a href={"/login"} className="text-white px-3 py-2 rounded-md text-sm font-medium">Login</a>
          <a href={"/logout"} className="text-white px-3 py-2 rounded-md text-sm font-medium">Logout</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
