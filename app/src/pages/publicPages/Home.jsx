// src/pages/Home/Home.js
import React from "react";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center">
        <h2 className="text-3xl font-semibold text-gray-800">
          Welcome to Eazy Manage
        </h2>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-4">
        <p>
          &copy; {new Date().getFullYear()} Eazy Manage. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
