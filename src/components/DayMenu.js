import { useState, useEffect } from "react";
import api from "../utils/Api";
import Swal from "sweetalert2";

function DayMenu() {
  const [menuDelDia, setMenuDelDia] = useState(null);
  const [entradaSeleccionada, setEntradaSeleccionada] = useState("");
  const [fondoSeleccionado, setFondoSeleccionado] = useState("");

  useEffect(() => {
    api.get("/menus")
      .then(res => setMenuDelDia(res.data))
      .catch(() =>
        Swal.fire("Error", "No se pudo cargar el menú del día", "error")
      );
  }, []);

  const handleEntradaChange = (e) => {
    setEntradaSeleccionada(e.target.value);
  };

  const handleFondoChange = (e) => {
    setFondoSeleccionado(e.target.value);
  };

  const confirmarReserva = async () => {
    if (entradaSeleccionada && fondoSeleccionado && menuDelDia) {
      try {
        await api.post("/reservas", {
          tipo: "menu",
          entrada: entradaSeleccionada,
          fondo: fondoSeleccionado,
          precio: menuDelDia.precio,
        });
        Swal.fire("Reserva confirmada", "Tu menú fue reservado", "success");
      } catch {
        Swal.fire("Error", "No se pudo registrar la reserva", "error");
      }
    } else {
      Swal.fire("Error", "Selecciona una entrada y un fondo", "error");
    }
  };

  if (!menuDelDia) {
    return (
      <div className="text-center mt-5">
        <h4>Cargando menú del día...</h4>
      </div>
    );
  }

  return (
    <>
      <div
        id="menu-dia"
        className="menu-container d-flex flex-column justify-content-center align-items-center"
      >
        <h2 className="seccion-titulo">Menú del Día</h2>
        <div className="menu-board">
          <div className="menu-header">Grand Central</div>
          <div className="menu-subheader">Menú del Día: {menuDelDia.fecha}</div>

          {/* Entradas */}
          <div className="menu-category">
            <i className="bi bi-check2"></i> Entradas:
          </div>
          {menuDelDia.entradas?.map((entrada, index) => (
            <label key={index} className={`entrada${index + 1}`}>
              <div className="menu-item">
                - {entrada}{" "}
                <input
                  type="radio"
                  name="entrada"
                  value={entrada}
                  checked={entradaSeleccionada === entrada}
                  onChange={handleEntradaChange}
                />
              </div>
            </label>
          ))}

          {/* Fondos */}
          <div className="menu-category">
            <i className="bi bi-check2"></i> Fondos:
          </div>
          {menuDelDia.fondos?.map((fondo, index) => (
            <label key={index} className={`fondo${index + 1}`}>
              <div className="menu-item">
                - {fondo}{" "}
                <input
                  type="radio"
                  name="fondo"
                  value={fondo}
                  checked={fondoSeleccionado === fondo}
                  onChange={handleFondoChange}
                />
              </div>
            </label>
          ))}

          <div className="menu-price">Precio: S/.{menuDelDia.precio?.toFixed(2)}</div>
          <button
            data-bs-toggle="modal"
            data-bs-target="#confirmModalPlatoDia"
            type="button"
            className="btn btn-success"
          >
            Reservar
          </button>
        </div>
      </div>

      {/* Modal de Reserva */}
      <div
        className="modal fade"
        id="confirmModalPlatoDia"
        tabIndex="-1"
        aria-labelledby="confirmModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmModalLabel" onClick={confirmarReserva}>
                Confirmar Reserva
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {entradaSeleccionada && fondoSeleccionado ? (
                <p>
                  Vas a reservar: <br />
                  <b>Entrada:</b> {entradaSeleccionada} <br />
                  <b>Fondo:</b> {fondoSeleccionado} <br />
                  <b>Precio:</b> S/.{menuDelDia.precio?.toFixed(2)}
                </p>
              ) : (
                <p>Selecciona una entrada y un fondo antes de reservar.</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                disabled={!entradaSeleccionada || !fondoSeleccionado}
                onClick={confirmarReserva}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DayMenu;
