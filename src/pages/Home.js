import "../App.css";
import Dishes from "../components/Dishes"
import DayMenu from "../components/DayMenu";
import Options from "../components/Options";
import Votation from "../components/Votation";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {

  return (
    <>
      <NavBar />

      {/*Sección Options*/}
      <Options />

      {/*Sección Platos*/}
      <Dishes />
      
      <hr className="mx-auto my-4 w-80 border-top border-secondary" />

      {/*Sección Menú del Día*/}
      <DayMenu />

      <hr className="mx-auto my-4 w-80 border-top border-secondary" />

      {/*Sección Votación*/}
      <Votation />

      {/*Sección Contacto*/}
      <section id="contacto" className="contacto">
        <div className="container">
          <div className="container text-center rectangulo d-flex justify-content-evenly">
            <div className="row">
              <div className="col-12 col-md-4 seccion-titulo">Hablemos!</div>
              <div className="col-12 col-md-4 descripcion">
                Si tienes alguna duda o te ocurrió algún error escríbenos a
                nuestro correo de contacto.
              </div>
              <div className="col-12 col-md-4">
                <a href="mailto:janedoe@micorreo.com">
                  <button type="button">
                    Contacto
                    <i className="bi bi-envelope-check-fill"></i>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    {/*Boton de BackToTop*/}
      <a
        href="#hero"
        className="boton-top btn btn-primary"
        aria-label="Ir a navegación"
        title="Ir a navegación"
      >
        <i className="bi bi-arrow-up"></i>
      </a>

      <Footer />
    </>
  );
}

export default Home;
