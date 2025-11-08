import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../utils/Api";

function Dishes() {
  const [platos, setPlatos] = useState([]);
  const [platoSeleccionado, setPlatoSeleccionado] = useState(null);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("usuarioActual");
    if (user) setUsuario(JSON.parse(user));

    const obtenerPlatos = async () => {
      try {
        const response = await api.get("/platos");
        setPlatos(response.data);
      } catch (error) {
        console.error("Error al cargar los platos:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron cargar los platos desde el servidor.",
        });
      }
    };
    obtenerPlatos();
  }, []);

  const manejarReserva = (plato) => setPlatoSeleccionado(plato);

  const confirmarReserva = async () => {
    if (!platoSeleccionado || !usuario) {
      Swal.fire("Error", "Debes iniciar sesión antes de reservar.", "error");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await api.post(
  "/reservas",
  {
    plato: { id: platoSeleccionado.id },
  },
  {
    headers: { Authorization: `Bearer ${token}` },
  }
);

      Swal.fire({
        title: "Reserva confirmada",
        text: `Has reservado ${platoSeleccionado.nombre} por S/.${platoSeleccionado.precio}`,
        icon: "success",
      });
    } catch (error) {
      console.error("Error al reservar el plato:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo realizar la reserva. Inténtalo de nuevo.",
      });
    }
  };

  return (
    <section id="platos" className="platos-carta d-flex flex-column">
      <h2 className="seccion-titulo">Platos a la Carta</h2>
      <div className="container text-center platos-contenedor">
        <div className="row">
          {platos.length > 0 ? (
            platos.map((plato) => (
              <div key={plato.id} className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="platos shadow-sm rounded overflow-hidden">
                  <img
                    src={
                      plato.imagen ||
                      "https://img.freepik.com/vector-gratis/plato-blanco-realista-aislado_1284-41743.jpg?semt=ais_hybrid&w=740&q=80"
                    }
                    alt={plato.nombre}
                    className="img-fluid"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="overlay p-3 bg-light">
                    <p className="fw-bold">{plato.nombre}</p>
                    <div className="d-flex justify-content-center gap-2">
                      <button className="btn btn-primary" disabled>
                        S/.{plato.precio}
                      </button>
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#confirmModalPlato"
                        type="button"
                        className="btn btn-success"
                        onClick={() => manejarReserva(plato)}
                      >
                        Reservar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted mt-4">No hay platos disponibles.</p>
          )}
        </div>
      </div>

      {/* Modal Confirmación */}
      <div className="modal fade" id="confirmModalPlato" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {platoSeleccionado ? (
              <>
                <div className="modal-header">
                  <h5 className="modal-title">
                    Confirmar Reserva - {platoSeleccionado.nombre}
                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body text-center">
                  <img
                    src={platoSeleccionado.imagen}
                    alt={platoSeleccionado.nombre}
                    className="img-fluid rounded mb-3"
                    style={{ maxHeight: "200px", objectFit: "cover" }}
                  />
                  <p>
                    Estás a punto de reservar <b>{platoSeleccionado.nombre}</b>{" "}
                    por <b>S/.{platoSeleccionado.precio}</b>.
                  </p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" data-bs-dismiss="modal">
                    Cancelar
                  </button>
                  <button
                    className="btn btn-success"
                    data-bs-dismiss="modal"
                    onClick={confirmarReserva}
                  >
                    Confirmar Reserva
                  </button>
                </div>
              </>
            ) : (
              <div className="p-3">Selecciona un plato primero</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dishes;
