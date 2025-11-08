import { useState } from "react";
import "../App.css";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import api from "../utils/Api"; // 👈 importamos axios base

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  // 🔹 LOGIN (usa /api/auth/login)
  const handleLogin = async (e) => {
    e.preventDefault();
    const correo = e.target.correo.value;
    const password = e.target.password.value;

    // Caso especial: admin hardcodeado (opcional)
    if (correo === "admin@admin.com" && password === "admin") {
      Swal.fire("Bienvenido Administrador");
      localStorage.setItem(
        "usuarioActual",
        JSON.stringify({ nombre: "Admin", correo, rol: "admin" })
      );
      window.location.href = "/api/admin";
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        correo,
        contrasenia: password,
      });

      // Guardar token en localStorage
      const token = response.data.token;
      localStorage.setItem("token", token);

      // Obtener datos del usuario autenticado (opcional)
      // Puedes crear un endpoint /api/usuarios/me, pero por ahora guardamos el correo
      Swal.fire("Inicio de sesión exitoso");
      localStorage.setItem(
        "usuarioActual",
        JSON.stringify({ correo, rol: "usuario" })
      );

      window.location.href = "/profile";
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Credenciales incorrectas",
      });
    }
  };

  // 🔹 REGISTRO (usa /api/usuarios/registro)
  const handleSignup = async (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value;
    const apellido = e.target.apellido.value;
    const correo = e.target.correo.value;
    const password = e.target.password.value;
    const repeatPassword = e.target.repeatPassword.value;

    if (password !== repeatPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden",
      });
      return;
    }

    try {
      const newUser = {
        nombre,
        apellido,
        correo,
        contrasenia: password, // backend espera 'contrasenia'
      };

      await api.post("/usuarios/registro", newUser);

      Swal.fire({
        title: "Éxito",
        text: "Usuario registrado con éxito",
        icon: "success",
      });

      setIsLogin(true);
      e.target.reset();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error al registrar",
        text: error.response?.data?.message || "No se pudo registrar el usuario",
      });
    }
  };

  return (
    <>
      <NavBar />

      <div className="auth-container container d-flex justify-content-center align-items-center mt-5 mb-5">
        <div className="card shadow-lg p-4">
          <div className="text-center mb-4">
            <h3 className="fw-bold text-dark">
              {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
            </h3>
            <p className="text-muted">
              {isLogin ? "Accede con tu cuenta" : "Regístrate para continuar"}
            </p>
          </div>

          {/* Formulario dinámico */}
          {isLogin ? (
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="correo" className="form-label">
                  Correo electrónico
                </label>
                <input type="email" className="form-control" id="correo" required />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  required
                />
              </div>
              <div className="d-grid mt-4">
                <button type="submit" className="btn btn-primary btn-lg">
                  Entrar
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignup}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input type="text" className="form-control" id="nombre" required />
              </div>
              <div className="mb-3">
                <label htmlFor="apellido" className="form-label">
                  Apellido
                </label>
                <input type="text" className="form-control" id="apellido" required />
              </div>
              <div className="mb-3">
                <label htmlFor="correo" className="form-label">
                  Correo electrónico
                </label>
                <input type="email" className="form-control" id="correo" required />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Nueva Contraseña
                </label>
                <input type="password" className="form-control" id="password" required />
              </div>
              <div className="mb-3">
                <label htmlFor="repeatPassword" className="form-label">
                  Repetir Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="repeatPassword"
                  required
                />
              </div>
              <div className="d-grid mt-4">
                <button type="submit" className="btn btn-primary btn-lg">
                  Registrarse
                </button>
              </div>
            </form>
          )}

          {/* Enlace dinámico */}
          <div className="text-center mt-3">
            <p className="text-muted">
              {isLogin ? (
                <>
                  ¿No tienes cuenta?{" "}
                  <button
                    className="btn btn-link p-0"
                    onClick={() => setIsLogin(false)}
                  >
                    Regístrate
                  </button>
                </>
              ) : (
                <>
                  ¿Ya tienes cuenta?{" "}
                  <button
                    className="btn btn-link p-0"
                    onClick={() => setIsLogin(true)}
                  >
                    Inicia sesión
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;
