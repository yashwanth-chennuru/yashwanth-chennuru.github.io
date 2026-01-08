// /api/movies.js
export default async function handler(request, response) {
  const { listId, page = 1 } = request.query;
  
  // This variable is pulled from Vercel's secure settings, NOT your code
  const READ_ACCESS_TOKEN = process.env.TMDB_READ_TOKEN;

  try {
    const tmdbResponse = await fetch(`https://api.themoviedb.org/4/list/${listId}?page=${page}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${READ_ACCESS_TOKEN}`
      }
    });

    const data = await tmdbResponse.json();
    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({ error: "Failed to fetch data" });
  }
}
