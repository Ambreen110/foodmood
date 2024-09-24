"use client"; // Ensure this is at the top of the file
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter for dynamic routes
import RecipeCard from '../../components/RecipeCard'; // Adjust path if necessary

const RecipePage = () => { // Ensure the component is correctly named
  const router = useRouter();
  const { id } = router.query; // Extract the dynamic ID from the route
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return; // Avoid fetching if id is not available
      try {
        const res = await fetch(`/api/recipe/${id}`); // Adjust according to your API structure
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await res.json();
        setRecipe(data); // Assuming the data structure matches what RecipeCard expects
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
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
        <RecipeCard recipe={recipe} /> // Render the RecipeCard component
      ) : (
        <p>No recipe found.</p>
      )}
    </div>
  );
};

export default RecipePage; // Ensure this line is the default export
