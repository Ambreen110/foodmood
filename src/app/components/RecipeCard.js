"use client"; // This should be at the top of the file
import React from 'react';
import Image from 'next/image';

const RecipeCard = ({ recipe }) => {
  if (!recipe) return null; // Guard clause for undefined recipe

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <Image 
        src={recipe.image} // Ensure this matches your data structure
        alt={recipe.title}
        width={300}
        height={200}
        className="w-full h-32 object-cover rounded-t-lg"
      />
      <h2 className="text-lg font-semibold mt-2">{recipe.title}</h2>
      <p>{recipe.summary}</p> {/* Example of showing the summary */}
      {/* Add more details as needed */}
    </div>
  );
};

export default RecipeCard; // Ensure this line is the default export
