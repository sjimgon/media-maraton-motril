export async function GET() {
  const apiKey = import.meta.env.OPENWEATHER_API_KEY_MMM;
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=Motril,ES&appid=${apiKey}&units=metric&lang=es`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Error en la respuesta de OpenWeather');
    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=1800' // Cachea la respuesta 30 min
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Error al obtener los datos del clima' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}