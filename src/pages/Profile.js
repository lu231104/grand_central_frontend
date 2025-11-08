import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../utils/Api";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import "../App.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [reserva, setReserva] = useState(null);
  const [codigo, setCodigo] = useState("");
  const [sugerencia, setSugerencia] = useState("");
  const [platosConsumidos] = useState(["Lomo Saltado", "Ají de Gallina", "Arroz con Pollo"]);

  // 🔹 Cargar usuario autenticado y su reserva desde backend
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // Llamada al endpoint que devuelve el usuario autenticado
        const response = await api.get("/usuarios/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const usuarioData = response.data;
        setUser(usuarioData);

        // Si tiene reservas, tomamos la más reciente
        if (usuarioData.reservas && usuarioData.reservas.length > 0) {
          const ultimaReserva = usuarioData.reservas[usuarioData.reservas.length - 1];
          setReserva(ultimaReserva);
        }
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cargar tu información desde el servidor.",
        });
      }
    };

    fetchUsuario();
  }, []);

  // 🔹 Cancelar reserva
  const handleCancelarReserva = async () => {
    if (!reserva) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/reservas/${reserva.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire({
        title: "Reserva cancelada",
        text: "Tu reserva ha sido eliminada correctamente.",
        icon: "success",
      });

      setReserva(null);
    } catch (error) {
      console.error("Error al cancelar reserva:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo cancelar la reserva.",
      });
    }
  };

  // 🔹 Cerrar sesión
  const handleCerrarSesion = () => {
    localStorage.removeItem("usuarioActual");
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  // 🔹 Formularios de código y sugerencia
  const handleSorteo = (e) => {
    e.preventDefault();
    if (codigo.trim() === "") {
      Swal.fire({ icon: "error", title: "Error", text: "Debes ingresar un código." });
      return;
    }
    Swal.fire(`Código enviado: ${codigo}`);
    setCodigo("");
  };

  const handleSugerencia = (e) => {
    e.preventDefault();
    if (sugerencia.trim() === "") {
      Swal.fire({ icon: "error", title: "Error", text: "Por favor escribe una sugerencia." });
      return;
    }
    Swal.fire(`Gracias por tu sugerencia: ${sugerencia}`);
    setSugerencia("");
  };

  return (
    <>
      <NavBar />

      <div className="container my-5">
        <h1 className="text-center seccion-titulo">Mi Perfil</h1>
        <div className="row g-4">
          {/* 🧍 COLUMNA IZQUIERDA */}
          <div className="col-lg-6 d-flex flex-column gap-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h4 className="perfil card-title">Información Personal</h4>
                {user ? (
                  <>
                    <p><strong>Nombre:</strong> {user.nombre}</p>
                    <p><strong>Apellido:</strong> {user.apellido}</p>
                    <p><strong>Correo:</strong> {user.correo}</p>

                    <button className="btn btn-warning mt-3" onClick={handleCerrarSesion}>
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <p className="text-muted">Cargando información...</p>
                )}
              </div>
            </div>

            {/* 🏆 Sorteo */}
            <div className="card shadow-sm border-0">
              <div className="card-body text-center">
                <h4 className="card-title">Participa en el sorteo</h4>
                <form
                  className="d-flex flex-column align-items-center"
                  onSubmit={handleSorteo}
                >
                  <input
                    type="text"
                    className="form-control mb-2 w-75"
                    placeholder="Ingresa tu código"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary">
                    Enviar
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* 🍽️ COLUMNA DERECHA */}
          <div className="col-lg-6 d-flex flex-column gap-4">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h4 className="card-title">Reserva actual</h4>

                {reserva ? (
                  <>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <strong>Plato:</strong> {reserva.plato?.nombre}
                      </li>
                      <li className="list-group-item">
                        <strong>Precio:</strong> S/.{reserva.plato?.precio}
                      </li>
                      <li className="list-group-item">
                        <strong>Fecha:</strong> {reserva.fechaReserva}
                      </li>
                    </ul>
                    <div className="d-flex justify-content-center mt-3">
                      <button
                        className="btn btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#confirmModal"
                      >
                        Cancelar Reserva
                      </button>
                    </div>
                  </>
                ) : (
                  <p className="text-muted">No tienes reservas activas.</p>
                )}
              </div>
            </div>

            {/* 📊 Platos más consumidos */}
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h4 className="card-title">Platos más consumidos</h4>
                <ul className="list-group list-group-flush">
                  {platosConsumidos.map((plato, idx) => (
                    <li key={idx} className="list-group-item">
                      {plato}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 💬 Caja de sugerencias */}
        <div className="row my-4">
          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h4 className="card-title">Caja de Sugerencias</h4>
                <form onSubmit={handleSugerencia}>
                  <textarea
                    className="form-control mb-3"
                    rows="4"
                    placeholder="Escribe tu sugerencia..."
                    value={sugerencia}
                    onChange={(e) => setSugerencia(e.target.value)}
                  ></textarea>
                  <button type="submit" className="btn btn-warning">
                    Enviar sugerencia
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* ⚠️ Modal Confirmar Cancelación */}
        <div
          className="modal fade"
          id="confirmModal"
          tabIndex="-1"
          aria-labelledby="confirmModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="confirmModalLabel">
                  Confirmar cancelación
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">¿Deseas cancelar tu reserva?</div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  No
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={handleCancelarReserva}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;
