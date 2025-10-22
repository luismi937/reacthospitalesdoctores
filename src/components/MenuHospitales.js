// Importo React y Component porque voy a crear un componente de clase
import React, { Component } from "react";

// Importo NavLink para navegar entre rutas dentro de la aplicación
import { NavLink } from "react-router-dom";

// Importo axios para hacer peticiones HTTP a la API
import axios from "axios";

// Importo Global para acceder a la URL base de la API de hospitales
import Global from "./Global";

// Defino mi componente de clase MenuHospitales
export default class MenuHospitales extends Component {
  // Guardo la URL base de la API
  url = Global.apiHospitales;

  // Defino el estado inicial: 'hospitales' será el array donde guardaré los datos de la API
  state = {
    hospitales: [],
  };

  // Función para cargar los hospitales desde la API
  loadHospitales = () => {
    // Construyo el endpoint relativo
    let request = "webresources/hospitales";

    // Hago la petición GET usando axios
    axios.get(this.url + request).then((response) => {
      // Muestro en consola que estoy leyendo los hospitales
      console.log("leyendo Hospitales");

      // Actualizo el estado con los datos obtenidos
      this.setState({
        hospitales: response.data,
      });
    });
  };

  // Este método se ejecuta cuando el componente se monta
  // Llamo a la función para cargar los hospitales de la API
  componentDidMount = () => {
    this.loadHospitales();
  };

  // Método render: aquí defino la barra de navegación (navbar)
  render() {
    return (
      <nav className="navbar navbar-expand-sm bg-body-tertiary">
        <div className="container-fluid">
          {/* Nombre o logo de la navbar */}
          <a className="navbar-brand" href="#">
            Navbar
          </a>

          {/* Botón para desplegar el menú en pantallas pequeñas */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Contenido colapsable de la navbar */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              {/* Enlace a la página principal */}
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>

              {/* Enlace al formulario para crear un nuevo hospital */}
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/create"
                >
                  New Hospital
                </NavLink>
              </li>

              {/* Enlace al listado completo de hospitales */}
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/hospitales"
                >
                  Hospitales
                </NavLink>
              </li>

              {/* Menú desplegable con todos los hospitales */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Hospitales
                </a>

                {/* Lista dinámica de hospitales */}
                <ul className="dropdown-menu">
                  {this.state.hospitales.map((hospital, index) => {
                    return (
                      <li key={index}>
                        {/* Cada hospital es un enlace a su lista de doctores */}
                        <NavLink
                          className="dropdown-item"
                          to={"/doctores/" + hospital.idhospital}
                        >
                          {hospital.nombre}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
