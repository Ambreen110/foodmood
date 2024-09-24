'use client'; // Ensure this is at the top of the file

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Change import to next/navigation
import { BackgroundGradient } from './ui/background-gradient';

const ListOfMealType = () => {
  const mealTypes = [
    'Main Course',
    'Side Dish',
    'Dessert',
    'Appetizer',
    'Salad',
    'Bread',
    'Breakfast',
    'Soup',
    'Beverage',
    'Sauce',
    'Marinade',
    'Fingerfood',
    'Snack',
    'Drink'
  ];

  const [selectedType, setSelectedType] = useState('Main Course');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const router = useRouter(); // Initialize the router

  const API_KEY = 'b961493cf862480a9824af5f9fd2dde8';

  const fetchRecipes = async (mealType) => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?type=${mealType}&apiKey=${API_KEY}`);
      if (!res.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const data = await res.json();
      setRecipes(data.results.slice(0, 4)); // Limit to 4 recipes
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMealTypeSelect = (type) => {
    setSelectedType(type);
    fetchRecipes(type);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleRecipeClick = (recipeId) => {
    router.push(`/recipes/${recipeId}`); // Navigate to the recipe page with the meal ID
  };

  useEffect(() => {
    fetchRecipes(selectedType);
  }, []);

  return (
    <div className="container mx-auto my-6 pt-16">
      <h2 className="text-secondary text-xl font-bold mb-4">
        Select a Meal Type
      </h2>

      <div className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {mealTypes.slice(0, showMore ? mealTypes.length : 4).map((type) => (
            <button
              key={type}
              onClick={() => handleMealTypeSelect(type)}
              className={`bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition ${selectedType === type ? 'bg-secondary' : ''}`}
            >
              {type}
            </button>
          ))}
        </div>

        <button
          onClick={toggleShowMore}
          className="flex items-center text-primary hover:text-secondary transition"
        >
          <span>{showMore ? 'See Less' : 'See More'}</span>
          <span className={`ml-1 transform transition-transform ${showMore ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
      </div>

      {loading && <p>Loading recipes...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id} className="bg-white shadow-md rounded-lg p-4" onClick={() => handleRecipeClick(recipe.id)}>
              <BackgroundGradient className="rounded-[22px] bg-white dark:bg-zinc-900">
                <Image 
                  src={recipe.image} 
                  alt={recipe.title} 
                  width={300} 
                  height={200} 
                  className="w-full h-32 object-cover rounded-t-lg" 
                />
                <div className="h-16 overflow-hidden">
                  <h3 className="text-lg font-semibold mt-2 whitespace-nowrap overflow-hidden text-ellipsis">
                    {recipe.title}
                  </h3>
                </div>
              </BackgroundGradient>
            </div>
          ))
        ) : (
          !loading && <p>No recipes found for this meal type.</p>
        )}
      </div>
    </div>
  );
};

export default ListOfMealType;
