"use client"
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-primary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">FoodMood</h1>
        <input 
          type="text" 
          className="rounded p-2 w-1/3" 
          placeholder="Search for a recipe..." 
        />
      </div>
    </nav>
  );
};

export default Navbar;
