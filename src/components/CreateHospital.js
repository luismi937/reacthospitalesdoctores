import React, { Component } from "react";
import axios from "axios";
import Global from "./Global";

export default class CreateHospital extends Component {
  cajaId = React.createRef();
  cajaNombre = React.createRef();
  cajaDireccion = React.createRef();
  cajaSalario = React.createRef();
  cajaTelefono = React.createRef();
  cajaCamas = React.createRef();

  url = Global.apiHospitales;
  insertHospital = (event) => {
    event.preventDefault();
    let request = "webresources/hospitales/post";
    //debemos respetar los tipos de dato del JSON
    let id = parseInt(this.cajaId.current.value);
    let camas = parseInt(this.cajaCamas.current.value);
    //el objeto jspn de react debe respetar mayusculas/minusculas
    //y el nombre de las propiedades y el servicio
    let hospital = {
      idhospital: id,
      nombre: this.cajaNombre.current.value,
      direccion: this.cajaDireccion.current.value,
      telefono: this.cajaTelefono.current.value,
      camas: camas,
    };
    axios.post(this.url + request, hospital).then((response) => {
      this.setState({
        mensaje: "Hospital insertado:" + hospital.nombre,
      });
    });
  };
  state = {
    mensaje: "",
  };

  render() {
    return (
      <div>
        <h1 style={{ color: "green" }}>Create Hospital</h1>
        <h3 style={{ color: "fuschia" }}>{this.state.mensaje}</h3>
        <form>
          <label>Id Hospital</label>
          <input type="text" ref={this.cajaId} className="form-control"></input>
          <label>Nombre</label>
          <input
            type="text"
            ref={this.cajaNombre}
            className="form-control"
          ></input>
          <label>Direccion</label>
          <input
            type="text"
            ref={this.cajaDireccion}
            className="form-control"
          ></input>
          <label>Telefono</label>
          <input
            type="text"
            ref={this.cajaTelefono}
            className="form-control"
          ></input>
          <label>Camas</label>
          <input
            type="text"
            ref={this.cajaCamas}
            className="form-control"
          ></input>
          <button className="btn btn-warning" onClick={this.insertHospital}>
            Nuevo Hospital
          </button>
        </form>
      </div>
    );
  }
}
