'use client'; // Ensure this is at the top of the file

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BackgroundGradient } from './ui/background-gradient';

const BestFoods = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const fetchBestFoods = async () => {
      try {
        const res = await fetch('/api/bestFoods');
        if (!res.ok) {
          throw new Error('Failed to fetch best foods');
        }
        const data = await res.json();
        console.log(data); // Log data to check the structure
        setFoods(data); // Directly set the fetched data
      } catch (error) {
        console.error('Error fetching best foods:', error);
      }
    };

    fetchBestFoods();
  }, []);

  return (
    <div className="container mx-auto my-6 bg-cream">
      <h2 className="text-secondary text-xl font-bold mb-4">Best Foods in the Area</h2>
      
      {/* Flex container for food cards */}
      <div className="flex flex-wrap justify-between">
        {foods.length > 0 ? (
          foods.map(food => (
            <Link key={food.id} href={`/recipes/${food.id}`} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-2">
              <div >
                <BackgroundGradient className="rounded-[22px] h-full flex flex-col bg-orange-300 text-blue-500 dark:bg-zinc-900">
                  <Image 
                    src={food.image} 
                    alt={food.title} 
                    width={200} 
                    height={300} 
                    className="w-full h-32 object-cover rounded-t-lg" 
                    priority // Ensure the image loads faster
                  />
                  <h3 className="text-lg font-semibold mt-2">{food.title}</h3>
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
