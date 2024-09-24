"use client"
import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter hook
import SearchBar from './SearchBar';

const Navbar = () => {
  const router = useRouter(); // Initialize the router

  const handleLogoClick = () => {
    router.push('/'); // Navigate to the home page
  };

  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 
          className="text-white text-xl font-bold cursor-pointer" 
          onClick={handleLogoClick} // Attach the click handler
        >
          FoodMood
        </h1>
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;