import React from "react";

const Hero = () => {
    const fondosDelDia = ["Ají de Gallina", "Pollo a la Mostaza"];
  return (
    <section id="hero" className="hero align-items-stretch">
      <div className="container my-4">
        <div className="button-container">
          <button className="btn btn-danger">
            <a href="/profile">VER MIS RESERVAS</a>
          </button>
          <div className="d-flex align-items-center">
            <span className="menu-info me-4">
              MENÚ DE HOY:{" "}
              <span className="text-muted">
                {fondosDelDia.join(" | ")}
              </span>
            </span>
            <button className="btn btn-danger">
              <a href="#menu-dia">IR AL MENU DEL DÍA</a>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
