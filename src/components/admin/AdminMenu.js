import { useEffect, useState } from "react";
import API from "../../utils/Api";
import Swal from "sweetalert2";

function Menu() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await API.get("/api/menus");
        setMenu(res.data);
      } catch (error) {
        Swal.fire("Error", "No se pudo cargar el menú", "error");
      }
    };
    fetchMenu();
  }, []);

  const handleDelete = async (id) => {
    if (await Swal.fire({ title: "¿Eliminar plato?", showCancelButton: true }).then(r => r.isConfirmed)) {
      try {
        await API.delete(`/menu/${id}`);
        setMenu(menu.filter((m) => m.id !== id));
        Swal.fire("Eliminado", "Elemento eliminado del menú", "success");
      } catch {
        Swal.fire("Error", "No se pudo eliminar el elemento", "error");
      }
    }
  };

  const handleEdit = (id) => {
    Swal.fire(`Editar ítem de menú con id: ${id}`);
  };

  return (
    <div>
      <h2 className="admin-subtitulo mb-4">Menú del Día</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {menu.length ? (
              menu.map((m) => (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td>{m.nombre}</td>
                  <td>{m.tipo}</td>
                  <td>{m.precio}</td>
                  <td>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(m.id)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(m.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className="text-center">No hay elementos</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Menu;
