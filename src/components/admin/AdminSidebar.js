// src/components/admin/Sidebar.js
function Sidebar({ setActiveComponent }) {

  const handleLogout = () => {
    localStorage.removeItem("usuarioActual");
    window.location.href = "/";
  };

  return (
    <div
      className="admin-sidebar bg-dark text-white p-3"      
    >
      

  <h4 className="text-center mb-4">Grand-Central Admin</h4>

      <ul className="nav flex-column">
        <li className="nav-item">
          <button
            className="btn btn-link text-white w-100 text-start"
            onClick={() => setActiveComponent("usuarios")}
          >
            Usuarios
          </button>
        </li>
        <li className="nav-item">
          <button
            className="btn btn-link text-white w-100 text-start"
            onClick={() => setActiveComponent("reservas")}
          >
            Reservas
          </button>
        </li>
        <li className="nav-item">
          <button
            className="btn btn-link text-white w-100 text-start"
            onClick={() => setActiveComponent("platos")}
          >
            Platos
          </button>
        </li>
        <li className="nav-item">
          <button
            className="btn btn-link text-white w-100 text-start"
            onClick={() => setActiveComponent("menu")}
          >
            Menú
          </button>
        </li>
        <li className="nav-item">
          <button
            className="btn btn-link text-white w-100 text-start"
            onClick={() => setActiveComponent("votaciones")}
          >
            Votaciones
          </button>
        </li>
         <li className="nav-item mt-3">
          <button
            className="btn btn-danger w-100 text-start"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            Cerrar Sesión
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
