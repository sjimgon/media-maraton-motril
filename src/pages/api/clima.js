export async function GET(){
    const apiKey = import.meta.env.OPENWEATHER_API_KEY_MMM;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=Motril&appid=${apiKey}&units=metric&lang=es`;



    try {
        const res = await fetch(url);
        const data = await res.json();

        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' }
        });
        
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Error al obtener loa datos del clima' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}