// Importo React y Component porque voy a crear un componente de clase
import React, { Component } from "react";

// Importo axios para hacer peticiones HTTP a la API
import axios from "axios";

// Importo Global para acceder a la URL base de la API de doctores
import Global from "./Global";

// Importo DetallesDoctor para mostrar información detallada de un doctor seleccionado
import DetallesDoctor from "./DetallesDoctor";

// Defino mi componente de clase llamado Doctores
export default class Doctores extends Component {
  // Guardo la URL base de la API
  url = Global.apiDoctores;

  // Defino el estado inicial del componente
  // 'doctores' almacenará el array de doctores del hospital
  // 'idDoctor' indica el doctor seleccionado para ver detalles
  state = {
    doctores: [],
    idDoctor: -1,
  };

  // Método para cargar los doctores de un hospital específico usando su id
  loadDoctoresHospital = () => {
    // Construyo el endpoint de la API concatenando el id del hospital recibido por props
    let request = "api/doctores/doctoreshospital/" + this.props.idhospital;

    // Hago la petición GET a la API
    axios.get(this.url + request).then((response) => {
      // Muestro en consola que estoy leyendo los datos de los doctores
      console.log("Leyendo doctores");

      // Actualizo el estado con el array de doctores recibido
      this.setState({
        doctores: response.data,
      });
    });
  };

  // Este método se ejecuta cuando el componente se monta por primera vez
  // Llamo a la función para cargar los doctores del hospital
  componentDidMount = () => {
    this.loadDoctoresHospital();
  };

  // Este método se ejecuta cada vez que el componente recibe nuevas props
  // Lo uso para recargar la lista de doctores si cambia el hospital
  componentDidUpdate = (oldProps) => {
    if (oldProps.idhospital != this.props.idhospital) {
      // Recargo los doctores del nuevo hospital
      this.loadDoctoresHospital();

      // Reseteo el doctor seleccionado
      this.setState({
        idDoctor: -1,
      });
    }
  };

  // Método render: define la interfaz que se mostrará al usuario
  render() {
    return (
      <div>
        {/* Si se ha seleccionado un doctor, muestro su información detallada */}
        {this.state.idDoctor != -1 && (
          <DetallesDoctor iddoctor={this.state.idDoctor} />
        )}

        {/* Título mostrando el id del hospital actual */}
        <h2 style={{ color: "Blue" }}>
          Doctores hospital: {this.props.idhospital}
        </h2>

        {/* Tabla con la lista de doctores */}
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
            {/* Recorro el array de doctores y creo una fila por cada doctor */}
            {this.state.doctores.map((doctor, index) => {
              return (
                <tr key={index}>
                  <td>{doctor.apellido}</td>
                  <td>{doctor.especialidad}</td>
                  <td>{doctor.salario}</td>
                  <td>{doctor.idHospital}</td>
                  <td>
                    {/* Botón que selecciona un doctor para mostrar sus detalles */}
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
