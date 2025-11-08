export function getVotaciones() {
  return JSON.parse(localStorage.getItem("votaciones")) || [];
}

export function saveVotaciones(votaciones) {
  localStorage.setItem("votaciones", JSON.stringify(votaciones));
}

// Obtener la votación del día actual
export function getVotacionDelDia() {
  const hoy = new Date().toLocaleDateString("es-PE");
  return getVotaciones().find(v => v.fecha === hoy) || null;
}

// Crear una nueva votación para el día
export function crearVotacion(entradas, fondos) {
  const hoy = new Date().toLocaleDateString("es-PE");
  const votaciones = getVotaciones();

  // si ya existe una votación hoy, no crear otra
  if (votaciones.some(v => v.fecha === hoy)) return;

  const nueva = {
    id: Date.now(),
    fecha: hoy,
    entradas: entradas.map(e => ({ ...e, votos: 0 })),
    fondos: fondos.map(f => ({ ...f, votos: 0 }))
  };

  votaciones.push(nueva);
  saveVotaciones(votaciones);
  return nueva;
}

// Registrar voto en la votación del día
export function registrarVoto(entradaId, fondoId) {
  const hoy = new Date().toLocaleDateString("es-PE");
  const votaciones = getVotaciones();
  const index = votaciones.findIndex(v => v.fecha === hoy);
  if (index === -1) return;

  const votacion = votaciones[index];

  const entrada = votacion.entradas.find(e => e.id === entradaId);
  if (entrada) entrada.votos += 1;

  const fondo = votacion.fondos.find(f => f.id === fondoId);
  if (fondo) fondo.votos += 1;

  votaciones[index] = votacion;
  saveVotaciones(votaciones);
}
