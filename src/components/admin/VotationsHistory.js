import { useState } from "react";
import { getVotaciones, crearVotacion } from "../../utils/Votations";
import Swal from 'sweetalert2';

function VotationsHistory({ votaciones, setVotaciones, setVotacionHoy }) {
    const [showModal, setShowModal] = useState(false);
    const [entradas, setEntradas] = useState(["", "", ""]);
    const [fondos, setFondos] = useState(["", "", ""]);

    const handleCrearVotacion = () => {
        const entradasValidas = entradas.filter(e => e.trim() !== "");
        const fondosValidos = fondos.filter(f => f.trim() !== "");

        if (entradasValidas.length < 3 || fondosValidos.length < 3) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Debes ingresar al menos 3 entradas y 3 fondos"
            });
            return;
        }

        const objEntradas = entradasValidas.map((e, idx) => ({
            id: `E${idx}-${Date.now()}`,
            nombre: e,
        }));
        const objFondos = fondosValidos.map((f, idx) => ({
            id: `F${idx}-${Date.now()}`,
            nombre: f,
        }));

        const nueva = crearVotacion(objEntradas, objFondos);

        if (nueva) {
            Swal.fire({
                title: "Éxito",
                text: "Votación creada para hoy",
                icon: "success"
            });
            setVotaciones(getVotaciones());
            setVotacionHoy(nueva);
            setShowModal(false);
            setEntradas(["", "", ""]);
            setFondos(["", "", ""]);
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ya existe una votación para hoy"
            });
        }
    };

    return (
        <div>
            <button className="btn btn-warning mb-3" onClick={() => setShowModal(true)}>
                Crear votación
            </button>

            {/* Tabla historial */}
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Entradas</th>
                            <th>Fondos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {votaciones.map((v) => (
                            <tr key={v.id}>
                                <td>{v.fecha}</td>
                                <td>{v.entradas.map((e) => e.nombre).join(", ")}</td>
                                <td>{v.fondos.map((f) => f.nombre).join(", ")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <>
                    <div className="modal d-block" tabIndex="-1">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Crear votación del día</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setShowModal(false)}
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    {/* Entradas */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Entradas</label>
                                        {entradas.map((e, i) => (
                                            <input
                                                key={i}
                                                type="text"
                                                className="form-control mb-2"
                                                placeholder={`Entrada ${i + 1}`}
                                                value={e}
                                                onChange={(ev) => {
                                                    const copia = [...entradas];
                                                    copia[i] = ev.target.value;
                                                    setEntradas(copia);
                                                }}
                                            />
                                        ))}
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => setEntradas([...entradas, ""])}
                                        >
                                            + Agregar otra entrada
                                        </button>
                                    </div>

                                    {/* Fondos */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Fondos</label>
                                        {fondos.map((f, i) => (
                                            <input
                                                key={i}
                                                type="text"
                                                className="form-control mb-2"
                                                placeholder={`Fondo ${i + 1}`}
                                                value={f}
                                                onChange={(ev) => {
                                                    const copia = [...fondos];
                                                    copia[i] = ev.target.value;
                                                    setFondos(copia);
                                                }}
                                            />
                                        ))}
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => setFondos([...fondos, ""])}
                                        >
                                            + Agregar otro fondo
                                        </button>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancelar
                                    </button>
                                    <button className="btn btn-success" onClick={handleCrearVotacion}>
                                        Guardar votación
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade show"></div>
                </>

            )}
        </div>
    );
}

export default VotationsHistory;