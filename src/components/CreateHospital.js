// Importo React y el componente base "Component" porque voy a crear un componente de clase
import React, { Component } from "react";

// Importo axios para poder hacer peticiones HTTP a mi API
import axios from "axios";

// Importo mi archivo Global donde tengo almacenada la URL base de los hospitales
import Global from "./Global";

// Importo Navigate para redirigir al usuario a otra ruta después de insertar un hospital
import { Navigate } from "react-router-dom";

// Defino mi clase "CreateHospital", que será el componente encargado de crear un nuevo hospital
export default class CreateHospital extends Component {
  // Defino referencias para cada campo del formulario.
  // De esta forma puedo acceder a sus valores fácilmente en el método de inserción.
  cajaId = React.createRef();
  cajaNombre = React.createRef();
  cajaDireccion = React.createRef();
  cajaSalario = React.createRef(); // Esta referencia no se usa, pero la dejo preparada por si luego quiero añadir salario
  cajaTelefono = React.createRef();
  cajaCamas = React.createRef();

  // Guardo la URL base de mi API (viene desde el archivo Global)
  url = Global.apiHospitales;

  // Este método se ejecuta cuando el usuario hace clic en el botón para crear un hospital
  insertHospital = (event) => {
    // Evito que el formulario recargue la página al enviarse
    event.preventDefault();

    // Defino el endpoint específico al que voy a hacer la petición POST
    let request = "webresources/hospitales/post";

    // Convierto los valores numéricos a enteros, ya que el servicio espera esos tipos de datos
    let id = parseInt(this.cajaId.current.value);
    let camas = parseInt(this.cajaCamas.current.value);

    // Creo un objeto JSON con la estructura exacta que espera la API
    // Debo respetar los nombres de las propiedades (mayúsculas y minúsculas)
    let hospital = {
      idhospital: id,
      nombre: this.cajaNombre.current.value,
      direccion: this.cajaDireccion.current.value,
      telefono: this.cajaTelefono.current.value,
      camas: camas,
    };

    // Envío la petición POST a la API con los datos del hospital
    axios.post(this.url + request, hospital).then((response) => {
      // Cuando el hospital se ha insertado correctamente, actualizo el estado con un mensaje
      this.setState({
        mensaje: "Hospital insertado: " + hospital.nombre,
        status: true, // Cambio el estado para activar la redirección
      });
    });
  };

  // Defino el estado inicial del componente
  // 'mensaje' mostrará texto de confirmación y 'status' controlará la redirección
  state = {
    mensaje: "",
    status: false,
  };

  // Método render: aquí defino la parte visual del componente
  render() {
    return (
      <div>
        {/* Si el hospital se ha creado correctamente, redirijo al listado de hospitales */}
        {this.state.status == true && <Navigate to="/hospitales" />}

        {/* Título principal */}
        <h1 style={{ color: "green" }}>Create Hospital</h1>

        {/* Mensaje de confirmación cuando se inserta un hospital */}
        <h3 style={{ color: "fuschia" }}>{this.state.mensaje}</h3>

        {/* Formulario para introducir los datos del nuevo hospital */}
        <form>
          <label>Id Hospital</label>
          <input type="text" ref={this.cajaId} className="form-control" />

          <label>Nombre</label>
          <input type="text" ref={this.cajaNombre} className="form-control" />

          <label>Direccion</label>
          <input type="text" ref={this.cajaDireccion} className="form-control" />

          <label>Telefono</label>
          <input type="text" ref={this.cajaTelefono} className="form-control" />

          <label>Camas</label>
          <input type="text" ref={this.cajaCamas} className="form-control" />

          {/* Botón para ejecutar el método insertHospital */}
          <button className="btn btn-warning" onClick={this.insertHospital}>
            Nuevo Hospital
          </button>
        </form>
      </div>
    );
  }
}
