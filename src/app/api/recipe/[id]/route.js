import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = params; // Get the dynamic id from the request parameters
  const apiKey = process.env.SPOONACULAR_API_KEY; // Store API key in .env
  const apiURL = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`; // Adjust URL to fetch specific recipe details

  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching the recipe:', error);
    return NextResponse.json({ error: 'Error fetching recipe' });
  }
}
