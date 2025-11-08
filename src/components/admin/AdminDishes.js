import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import API from "../../utils/Api";

function Platos() {
  const [platos, setPlatos] = useState([]);
  const [formData, setFormData] = useState({ nombre: "", precio: "", imagen: "" });
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPlatos = async () => {
      try {
        const res = await API.get("/platos");
        setPlatos(res.data);
      } catch (error) {
        Swal.fire("Error", "No se pudo cargar los platos", "error");
      }
    };
    fetchPlatos();
  }, []);

  const handleSave = async () => {
    if (!formData.nombre || !formData.precio || !formData.imagen) {
      return Swal.fire("Error", "Todos los campos son obligatorios", "error");
    }

    try {
      if (editId) {
        await API.put(`/platos/${editId}`, formData);
        Swal.fire("Actualizado", "Plato actualizado correctamente", "success");
      } else {
        await API.post("/platos", formData);
        Swal.fire("Agregado", "Plato agregado correctamente", "success");
      }
      setFormData({ nombre: "", precio: "", imagen: "" });
      setEditId(null);
      const res = await API.get("/platos");
      setPlatos(res.data);
    } catch (error) {
      Swal.fire("Error", "No se pudo guardar el plato", "error");
    }
  };

  const handleDelete = async (id) => {
    if (await Swal.fire({ title: "¿Eliminar plato?", showCancelButton: true }).then(r => r.isConfirmed)) {
      try {
        await API.delete(`/platos/${id}`);
        setPlatos(platos.filter((p) => p.id !== id));
        Swal.fire("Eliminado", "Plato eliminado correctamente", "success");
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar el plato", "error");
      }
    }
  };

  const handleEdit = (plato) => {
    setEditId(plato.id);
    setFormData(plato);
  };

  const filteredPlatos = platos.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="admin-subtitulo mb-4">Platos</h2>

      {/* Buscador */}
      <div className="input-group mb-3">
        <span className="btn btn-primary"><i className="bi bi-search"></i></span>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nombre"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Formulario */}
      <div className="mb-4 p-3 border rounded bg-light shadow-sm">
        <h3>{editId ? "Editar Plato" : "Agregar Nuevo Plato"}</h3>
        <div className="row g-2">
          <div className="col-md">
            <input
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="form-control"
            />
          </div>
          <div className="col-md">
            <input
              type="number"
              step="0.01"
              name="precio"
              placeholder="Precio"
              value={formData.precio}
              onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
              className="form-control"
            />
          </div>
          <div className="col-md">
            <input
              name="imagen"
              placeholder="URL Imagen"
              value={formData.imagen}
              onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
              className="form-control"
            />
          </div>
          <div className="col-md-auto">
            <button onClick={handleSave} className="btn btn-primary">
              {editId ? "Actualizar" : "Agregar"}
            </button>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered shadow-sm align-middle">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Imagen</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlatos.length ? (
              filteredPlatos.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td><img src={p.imagen} alt={p.nombre} width="60" /></td>
                  <td>{Number(p.precio).toFixed(2)}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(p)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" className="text-center">No hay platos</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Platos;
