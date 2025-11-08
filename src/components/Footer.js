// src/components/Footer.js
function Footer() {
  return (
    <footer className="d-flex flex-column align-items-center justify-content-center">
      <div className="footer-top d-flex flex-wrap align-items-center justify-content-center">
        <img
          className="footer-logo"
          src="../img/logo-removebg.png"
          alt="Logo"
        />

        <div className="crear-cuenta text-center">
          <p className="footer-texto-sm">¿Aún no tienes una cuenta?</p>
          <a href="/login" className="boton-crear-cuenta">
            Crear cuenta
          </a>
        </div>

        <p className="footer-texto text-center">
          Esta plataforma ha sido creada para recopilar las preferencias
          culinarias de los participantes. Los resultados reflejan únicamente
          la opinión de los usuarios y no determinan decisiones oficiales.
        </p>
      </div>

      <div className="iconos-redes-sociales d-flex flex-wrap align-items-center justify-content-center">
        <a href="https://x.com/home" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-twitter"></i>
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-github"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-instagram"></i>
        </a>
        <a href="mailto:lu@micorreo.com" target="_blank" rel="noopener noreferrer">
          <i className="bi bi-envelope"></i>
        </a>
      </div>

      <div className="derechos-de-autor">
        Creado por Naomi y Luis (2025) &#169;
      </div>
    </footer>
  );
}

export default Footer;
