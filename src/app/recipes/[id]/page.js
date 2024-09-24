// pages/recipes/[id].js
"use client"; // This should be at the top of the file
import { useEffect, useState } from 'react';
import RecipeCard from '../../components/RecipeCard'; // Adjust the path as needed
import { useParams } from 'next/navigation';

const RecipePage = () => { 
  const { id } = useParams(); // Extract dynamic ID from the route
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return; // Avoid fetching if id is not available
      try {
        const res = await fetch(`/api/recipe/${id}`); 
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await res.json();
        setRecipe(data.meals[0]); // Use the first meal in the array
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false); 
      }
    };
    fetchRecipe();
  }, [id]);

  return (
    <div>
      <h1 className="text-2xl font-bold my-4">Recipe Details</h1>
      {loading ? (
        <p>Loading recipe...</p>
      ) : recipe ? (
        <RecipeCard recipe={recipe} /> 
      ) : (
        <p>No recipe found.</p>
      )}
    </div>
  );
};

export default RecipePage; // Ensure the export is default
