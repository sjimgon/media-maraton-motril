// ==========================================
// ⚙️ CONFIGURACIÓN FÁCIL DE METEOROLOGÍA
// ==========================================
export const CONFIG_METEO = {
  anio: 2026,
  mes: 10, // 1 = Enero, 10 = Octubre (ya no tienes que restar 1)
  nombreMes: 'OCTUBRE',
  horaObjetivoUTC: 9, // 09:00 UTC equivale a las 11:00h en España (hora de la carrera)
  dias: [
    { dia: 17, etiqueta: 'PRE-EVENTO', esPrincipal: false },
    { dia: 18, etiqueta: 'DÍA DE LA CARRERA', esPrincipal: true },
    { dia: 19, etiqueta: 'POST-EVENTO', esPrincipal: false }
  ]
};

const ICONOS_METEO = {
  800: 'soleado',
  801: 'soleado',
  802: 'entrenublado',
  803: 'nublado',
  804: 'nublado',
  500: 'lluvia suave',
  501: 'lluvia',
  502: 'lluvia',
  200: 'tormentoso',
  201: 'tormentoso',
  701: 'niebla',
  711: 'viento'
};

export async function procesarClima() {
  const response = await fetch('/api/clima');
  if (!response.ok) throw new Error('Error al obtener los datos del clima');
  
  const data = await response.json();
  if (!data?.list) return [];

  const resultados = [];

  for (const itemConfig of CONFIG_METEO.dias) {
    // Filtramos todos los bloques de ese día, mes y año usando UTC para evitar fallos de zona horaria
    const bloquesDia = data.list.filter(bloque => {
      const fecha = new Date(bloque.dt * 1000);
      return (
        fecha.getUTCFullYear() === CONFIG_METEO.anio &&
        fecha.getUTCMonth() + 1 === CONFIG_METEO.mes &&
        fecha.getUTCDate() === itemConfig.dia
      );
    });

    if (bloquesDia.length > 0) {
      // Elegimos el bloque cuya hora esté más cerca de la hora de la carrera (09:00 UTC / 11:00 local)
      const bloqueIdeal = bloquesDia.reduce((prev, curr) => {
        const horaPrev = new Date(prev.dt * 1000).getUTCHours();
        const horaCurr = new Date(curr.dt * 1000).getUTCHours();
        return Math.abs(horaCurr - CONFIG_METEO.horaObjetivoUTC) < Math.abs(horaPrev - CONFIG_METEO.horaObjetivoUTC)
          ? curr
          : prev;
      });

      const idClima = bloqueIdeal.weather[0].id;

      resultados.push({
        dia: itemConfig.dia,
        cielo: bloqueIdeal.weather[0].description,
        temperatura: Math.round(bloqueIdeal.main.temp), // Redondeado para que quede más limpio
        viento: (bloqueIdeal.wind.speed * 3.6).toFixed(0), // km/h sin decimales innecesarios
        humedad: bloqueIdeal.main.humidity,
        icono: `/svg/iconos-meteo/${ICONOS_METEO[idClima] || 'soleado'}.svg`
      });
    }
  }

  return resultados;
}