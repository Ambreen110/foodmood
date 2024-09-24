// app/api/bestFoods/route.js
export async function GET() {
    const apiKey = 'b961493cf862480a9824af5f9fd2dde8';  // Your Spoonacular API Key
    const apiURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=3&query=best`; // Adjust the query as needed
  
    try {
      const res = await fetch(apiURL);
      if (!res.ok) {
        throw new Error('Failed to fetch data from Spoonacular API');
      }
      const data = await res.json();
      return new Response(JSON.stringify(data.results), {
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
  