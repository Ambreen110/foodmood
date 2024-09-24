export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const cuisine = searchParams.get('cuisine') || 'Indian'; // Default to Indian if no cuisine is provided
  const apiURL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`;

  try {
    const res = await fetch(apiURL);
    if (!res.ok) {
      throw new Error('Failed to fetch data from TheMealDB API');
    }
    const data = await res.json();

    // Assuming the API provides an array of meals in the 'meals' key
    // Limit the results to 4
    const bestFoods = data.meals.slice(0, 3);

    return new Response(JSON.stringify(bestFoods), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching best foods:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch best foods' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}