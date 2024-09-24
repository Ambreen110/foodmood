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
    <div className="container mx-auto my-6 bg-cream px-4"> {/* Added padding for mobile */}
      <h2 className="text-secondary text-xl font-bold mb-4 text-center">Best Foods</h2>
      
      {/* Cuisine buttons */}
      <div className="flex flex-wrap justify-center mb-4 w-full"> {/* Center buttons */}
        {cuisines.map(cuisine => (
          <button 
            key={cuisine}
            onClick={() => setSelectedCuisine(cuisine)}
            className={`flex-1 mx-1 px-4 py-2 rounded-lg text-white ${selectedCuisine === cuisine ? 'bg-blue-500' : 'bg-orange-400'} transition duration-200`}
          >
            {cuisine}
          </button>
        ))}
      </div>
      
      {/* Flex container for food cards, allowing wrapping */}
      <div className="flex flex-wrap justify-center">
        {foods.length > 0 ? (
          foods.map((food) => (
            <Link key={food.idMeal} href={`/recipes/${food.idMeal}`} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/4 p-2"> {/* Responsive widths */}
              <div className="h-60"> {/* Set a specific height for the food card */}
                <BackgroundGradient className="rounded-[22px] h-full flex flex-col bg-orange-300 text-blue-500 dark:bg-zinc-900">
                  <Image 
                    src={food.strMealThumb} // Updated to correct image field
                    alt={food.strMeal} // Updated to correct title field
                    width={200} 
                    height={300} 
                    className="w-full h-full object-cover rounded-lg" 
                    priority // Ensure the image loads faster
                  />
                  <h3 className="text-lg font-semibold mt-2">{food.strMeal}</h3> {/* Correct title */}
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
