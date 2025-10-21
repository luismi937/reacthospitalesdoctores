import React, { Component } from "react";
import axios from "axios";
import Global from "./Global";
import { resumeToPipeableStream } from "react-dom/server";
import DetallesDoctor from "./DetallesDoctor";
export default class Doctores extends Component {
  url = Global.apiDoctores;
  state = {
    doctores: [],
    idDoctor: -1,
  };
  loadDoctoresHospital = () => {
    let request = "api/doctores/doctoreshospital/" + this.props.idhospital;
    axios.get(this.url + request).then((response) => {
      console.log("Leyendo doctores");
      this.setState({
        doctores: response.data,
      });
    });
  };
  componentDidMount = () => {
    this.loadDoctoresHospital();
  };
  componentDidUpdate = (oldProps) => {
    if (oldProps.idhospital != this.props.idhospital) {
      this.loadDoctoresHospital();
      this.setState({
        idDoctor: -1,
      });
    }
  };
  render() {
    return (
      <div>
        {this.state.idDoctor != -1 && (
          <DetallesDoctor iddoctor={this.state.idDoctor} />
        )}
        <h2 style={{ color: "Blue" }}>
          Doctores hospital: {this.props.idhospital}
        </h2>
        <table className="table table-primary">
          <thead>
            <tr>
              <th>Apellido</th>
              <th>Especialidad</th>
              <th>Salario</th>
              <th>Id Hospital</th>
            </tr>
          </thead>
          <tbody>
            {this.state.doctores.map((doctor, index) => {
              return (
                <tr key={index}>
                  <td>{doctor.apellido}</td>
                  <td>{doctor.especialidad}</td>
                  <td>{doctor.salario}</td>
                  <td>{doctor.idHospital}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        this.setState({
                          idDoctor: doctor.idDoctor,
                        });
                      }}
                    >
                      Detalles
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
