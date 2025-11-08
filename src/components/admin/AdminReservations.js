import { useState, useEffect } from "react";
import API from "../../utils/Api"; // ✅ usa tu cliente Axios configurado

function Reservas() {
  const [search, setSearch] = useState("");
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        // 🔹 Traemos todos los usuarios con sus reservas
        const res = await API.get("/usuarios");
        const usuarios = res.data;

        // 🔹 Mapa para agrupar platos por nombre
        const mapa = new Map();

        usuarios.forEach((u) => {
          if (u.reservas && u.reservas.length > 0) {
            u.reservas.forEach((r) => {
              const nombrePlato = r.plato?.nombre?.trim();
              const precio = Number(r.plato?.precio) || 0;

              if (!nombrePlato) return;

              if (mapa.has(nombrePlato)) {
                // Si el plato ya existe, aumentar cantidad
                const existente = mapa.get(nombrePlato);
                existente.cantidad += 1;
              } else {
                // Si no existe, crear nueva entrada
                mapa.set(nombrePlato, {
                  id: mapa.size + 1,
                  nombre: nombrePlato,
                  precio: precio,
                  cantidad: 1,
                });
              }
            });
          }
        });

        // Convertimos el mapa a array
        setReservas(Array.from(mapa.values()));
      } catch (error) {
        console.error("Error al cargar reservas:", error);
      }
    };

    fetchReservas();
  }, []);

  // 🔹 Filtrado
  const filtered = reservas.filter((r) =>
    r.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="admin-subtitulo mb-4">Reservas</h2>

      {/* -------- Buscador -------- */}
      <div className="input-group mb-3">
        <span className="btn btn-primary">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre del plato"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* -------- Tabla -------- */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Plato</th>
              <th>Precio (S/)</th>
              <th>Cantidad de reservas</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((r, index) => (
                <tr key={r.id || index}>
                  <td>{index + 1}</td>
                  <td>{r.nombre}</td>
                  <td>{r.precio.toFixed(2)}</td>
                  <td>{r.cantidad}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">
                  No se encontraron reservas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reservas;
