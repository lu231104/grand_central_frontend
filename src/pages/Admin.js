// src/pages/Admin.js
import { useState } from "react";
import "../App.css";
import Sidebar from "../components/admin/AdminSidebar";
import Usuarios from "../components/admin/AdminUsers";
import Reservas from "../components/admin/AdminReservations";
import Platos from "../components/admin/AdminDishes";
import Menu from "../components/admin/AdminMenu";
import Votaciones from "../components/admin/AdminVoting";

function Admin() {
  const [activeComponent, setActiveComponent] = useState("usuarios");

  const renderComponent = () => {
    switch (activeComponent) {
      case "usuarios":
        return <Usuarios />;
      case "reservas":
        return <Reservas />;
      case "platos":
        return <Platos />;
      case "menu":
       return <Menu />;
      case "votaciones":
       return <Votaciones />;
      default:
        return <Usuarios />;
    }
  };

  return (
    <div className="admin-wrapper d-flex">
      {/* Sidebar */}
      <Sidebar setActiveComponent={setActiveComponent} />

      {/* Contenido */}
      <div className="admin-content flex-grow-1 p-4">
        {renderComponent()}
      </div>
    </div>
  );
}

export default Admin;
