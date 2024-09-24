'use client'; // Ensure this is at the top of the file

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BackgroundGradient } from './ui/background-gradient';

const cuisines = ['Indian', 'American', 'Chinese', 'Italian', 'Mexican'];

const BestFoods = () => {
  const [foods, setFoods] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState('Indian'); // Default cuisine

  useEffect(() => {
    const fetchBestFoods = async () => {
      try {
        const res = await fetch(`/api/bestFoods?cuisine=${selectedCuisine}`);
        if (!res.ok) {
          throw new Error('Failed to fetch best foods');
        }
        const data = await res.json();
        setFoods(data); // Directly set the fetched data
      } catch (error) {
        console.error('Error fetching best foods:', error);
      }
    };

    fetchBestFoods();
  }, [selectedCuisine]); // Fetch when selectedCuisine changes

  return (
    <div className="container mx-auto my-6 bg-cream">
      <h2 className="text-secondary text-xl font-bold mb-4 text-center">Best Foods</h2>
      
      {/* Cuisine buttons */}
      <div className="flex flex-wrap justify-between mb-4 w-full"> {/* Use flex-wrap for better mobile handling */}
  {cuisines.map(cuisine => (
    <button 
      key={cuisine}
      onClick={() => setSelectedCuisine(cuisine)}
      className={`flex-1 mx-1 px-4 py-2 rounded-lg text-white ${selectedCuisine === cuisine ? 'bg-blue-500' : 'bg-orange-400'} transition duration-200 h-10`} // Fixed height for buttons
    >
      {cuisine}
    </button>
  ))}
</div>

      
      {/* Flex container for food cards, allowing wrapping */}
      <div className="flex flex-wrap justify-center gap-4"> {/* Use gap to prevent overlapping */}
        {foods.length > 0 ? (
          foods.map((food) => (
            <Link key={food.idMeal} href={`/recipes/${food.idMeal}`} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"> {/* Responsive width */}
              <div className="h-full flex flex-col bg-slate-500 rounded-[22px]"> {/* Flex column for consistent height */}
                <BackgroundGradient className="flex-1 flex flex-col rounded-[22px] bg-orange-300 text-blue-500 dark:bg-zinc-900">
                  <Image 
                    src={food.strMealThumb} // Updated to correct image field
                    alt={food.strMeal} // Updated to correct title field
                    width={200} 
                    height={300} 
                    className="w-full h-48 object-cover rounded-t-[22px]" // Fixed height for images
                    priority // Ensure the image loads faster
                  />
                  <h3 className="text-lg font-semibold mt-2 text-center">{food.strMeal}</h3> {/* Centered title */}
                </BackgroundGradient>
              </div>
            </Link>
          ))
        ) : (
          <p>No best foods available.</p>
        )}
      </div>
    </div>
  );
};

export default BestFoods;
