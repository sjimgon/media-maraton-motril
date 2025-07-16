export async function procesarClima(){
    const response = await fetch('/api/clima');
    if (!response.ok) {
        throw new Error('Error al obtener los datos del clima');
    }
    const data = await response.json();
    
    const diasEvento = [19,20,21];
    const mesEvento = 6; //Para los Date, enero es 0, febrero es 1, etc.
    const yearEvento = 2025;

    const resultados = [];

    for (const bloque of data.list){
        const fecha  = new Date(bloque.dt *1000); // Convertir de segundos a milisegundos para sacar la fecha con forma Date
        const dia = fecha.getDate();
        const mes = fecha.getMonth(); // Los meses en JavaScript empiezan desde 0, 
        const year = fecha.getFullYear();
        const hora = fecha.getHours();

        if (diasEvento.includes(dia) && mes === mesEvento && year === yearEvento) {
            if(hora > 0){
                resultados.push({
                    dia,
                    cielo: bloque.weather[0].description,
                    temperatura: bloque.main.temp,
                    viento: (bloque.wind.speed*3.6).toFixed(1), // Convertir de m/s a km/h
                    humedad: bloque.main.humidity,
                    id: bloque.weather[0].id
                    }
                );
            }
        }
    }
    
    return resultados;
}