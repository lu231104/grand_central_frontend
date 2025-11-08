import React, { useState, useEffect } from "react";
import { getUsuarioActual, setUsuarioActual } from "../utils/Reservations";
import { getVotacionDelDia, registrarVoto } from "../utils/Votations";
import Swal from "sweetalert2";

const Votation = () => {
  const [votacion, setVotacion] = useState(null);
  const [entradaSeleccionada, setEntradaSeleccionada] = useState(null);
  const [fondoSeleccionado, setFondoSeleccionado] = useState(null);

  useEffect(() => {
    setVotacion(getVotacionDelDia());
  }, []);

  if (!votacion) {
    return (
      <h2 className="text-center mt-5">No hay votación creada para hoy</h2>
    );
  }

  const handleVotar = () => {
    const usuario = getUsuarioActual();
    if (!usuario) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debes iniciar sesión para votar",
      });
      return;
    }

    const hoy = new Date().toLocaleDateString("es-PE");

    // Verificamos si ya votó HOY
    if (usuario.votacion && usuario.votacion.fecha === hoy) {
      Swal.fire({
        title: "Exito",
        text: "Ya realizaste tu votación de hoy",
        icon: "success",
      });
      return;
    }

    if (!entradaSeleccionada || !fondoSeleccionado) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debes seleccionar una entrada y un fondo",
      });
      return;
    }

    usuario.votacion = {
      fecha: hoy,
      entrada: votacion.entradas.find((e) => e.id === entradaSeleccionada)
        ?.nombre,
      fondo: votacion.fondos.find((f) => f.id === fondoSeleccionado)?.nombre,
    };
    setUsuarioActual(usuario);

    registrarVoto(entradaSeleccionada, fondoSeleccionado);

    Swal.fire(
      `Tu voto se guardó: ${usuario.votacion.entrada} y ${usuario.votacion.fondo}`
    );
  };
  return (
    <>
      {/* Sección Votación */}
      <div id="votacion" className="votacion-explicacion container my-5">
        <div className="row g-4">
          {/* Explicación */}
          <div className="col-lg-6 p-50">
            <div className="votacion-explicacion-container card shadow-sm border-0 h-100">
              <div className="card-body">
                <h2 className="titulo-votacion card-title mb-3">
                  Votación para el Menú del Día
                </h2>
                <p className="card-text">
                  En esta nueva sección puedes participar activamente en la
                  elección del menú que se servirá al día siguiente. Revisa las
                  imágenes de los platos disponibles y selecciona tus opciones
                  favoritas en las categorías de entradas y fondos.
                  <br />
                  Tu voto es importante para que podamos ofrecer los platos más
                  deseados por todos. Las votaciones están abiertas hasta las
                  6:00 pm cada día, y los resultados definirán el menú del día
                  siguiente.
                  <br />
                  ¡No pierdas la oportunidad de elegir lo que más te gusta!
                </p>
                <div className="text-center mt-2">
                  <img
                    src="../img/comidas_criollas_peruanas.png"
                    alt="Imagen explicativa"
                    className="comida-criolla img-fluid rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Votaciones */}
          <div className="col-lg-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">
                  Votación de Entradas
                </h2>
                <div className="votacion-entrada">
                  {votacion.entradas.map((entrada) => (
                    <label className="entrada" key={entrada.id}>
                      <div className="nombre-entrada">{entrada.nombre}</div>
                      <div className="imagen-entrada text-center my-2">
                        <img
                          src={
                            entrada.imagen ||
                            "https://imgs.search.brave.com/L35xuY9rLpgS4Fh-6AD4abs8X9S_AKzxuMeG3ccOkrE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzkxLzIyLzU5/LzM2MF9GXzc5MTIy/NTkyNl9NVUVQdWtv/MHhnakt2V2VBSEdQ/ZEVyUUhZNlgyWkox/bS5qcGc"
                          }
                          alt={`Imagen de ${entrada.nombre}`}
                          className="img-fluid rounded img-votacion"
                        />
                      </div>
                      <div className="barra-resultado">
                        <div
                          className="relleno"
                          style={{ width: `${entrada.porcentaje}%` }}
                        ></div>
                      </div>
                      <div className="porcentaje">{entrada.porcentaje}%</div>
                      <div className="checkbox-container">
                        <input
                          type="radio"
                          name="entrada-voto"
                          value={entrada.id}
                          onChange={() => setEntradaSeleccionada(entrada.id)}
                        />
                      </div>
                    </label>
                  ))}
                </div>

                <h2 className="card-title text-center my-4">
                  Votación de Fondos
                </h2>
                <div className="votacion-fondo">
                  {votacion.fondos.map((fondo) => (
                    <label className="fondo" key={fondo.id}>
                      <div className="nombre-fondo">{fondo.nombre}</div>
                      <div className="imagen-fondo text-center my-2">
                        <img
                          src={
                            fondo.imagen ||
                            "https://imgs.search.brave.com/L35xuY9rLpgS4Fh-6AD4abs8X9S_AKzxuMeG3ccOkrE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA3LzkxLzIyLzU5/LzM2MF9GXzc5MTIy/NTkyNl9NVUVQdWtv/MHhnakt2V2VBSEdQ/ZEVyUUhZNlgyWkox/bS5qcGc"
                          }
                          alt={`Imagen de ${fondo.nombre}`}
                          className="img-fluid rounded img-votacion"
                        />
                      </div>
                      <div className="barra-resultado">
                        <div
                          className="relleno"
                          style={{ width: `${fondo.porcentaje}%` }}
                        ></div>
                      </div>
                      <div className="porcentaje">{fondo.porcentaje}%</div>
                      <div className="checkbox-container">
                        <input
                          type="radio"
                          name="fondo-voto"
                          value={fondo.id}
                          onChange={() => setFondoSeleccionado(fondo.id)}
                        />
                      </div>
                    </label>
                  ))}
                </div>

                <div className="boton-votacion d-flex justify-content-center">
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#confirmModalVotacion"
                    type="button"
                    className="btn btn-success"
                  >
                    Votar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Votación */}
      <div
        className="modal fade"
        id="confirmModalVotacion"
        tabIndex="-1"
        aria-labelledby="confirmModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="confirmModalLabel">
                Confirmar acción
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {votacion.entradaNombre && votacion.fondoNombre ? (
                <>
                  Vas a votar por <strong>{votacion.entradaNombre}</strong> como
                  entrada y <strong>{votacion.fondoNombre}</strong> como fondo.
                </>
              ) : (
                "Debes seleccionar una entrada y un fondo antes de votar."
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
                onClick={handleVotar}
              >
                Votar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Votation;
