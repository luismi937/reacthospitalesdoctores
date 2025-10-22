// Importo React y Component porque voy a crear un componente de clase
import React, { Component } from 'react'

// Importo mi archivo Global donde tengo la URL base de la API
import Global from './Global';

// Importo axios para poder hacer peticiones HTTP
import axios from 'axios';

// Defino mi componente de clase llamado DetallesDoctor
export default class DetallesDoctor extends Component {
    // Guardo la URL base de mi API en una propiedad para usarla en las peticiones
    url = Global.apiDoctores

    // Defino el estado inicial del componente
    // 'doctor' será el objeto donde guardaré los datos del doctor obtenido desde la API
    state = {
        doctor: null
    }

    // Creo un método para buscar un doctor concreto según el id que recibo por props
    findDoctor = () => {
        // Construyo la URL de la petición con el id del doctor recibido desde las props
        let request = "api/doctores/" + this.props.iddoctor;

        // Hago una petición GET a la API para obtener los datos del doctor
        axios.get(this.url + request).then(response => {
            // Muestro en consola que estoy leyendo los datos de los doctores
            console.log("Leyendo doctores");

            // Actualizo el estado con los datos del doctor recibido desde la API
            this.setState({
                doctor: response.data
            });
        });
    }

    // Este método se ejecuta automáticamente cuando el componente se monta por primera vez
    // Aquí llamo a mi función para cargar los datos del doctor inicial
    componentDidMount = () => {
        this.findDoctor();
    }

    // Este método se ejecuta cada vez que el componente se actualiza (por ejemplo, si cambia el id)
    // Lo uso para volver a cargar los datos si el usuario cambia de doctor
    componentDidUpdate = () => {
        this.findDoctor();
    }

    // Método render: es el que pinta el contenido en pantalla
    render() {
        return (
            <div>
                <h1>Detalles Doctor</h1>

                {/* Si ya he recibido los datos del doctor, los muestro en una lista */}
                {
                    this.state.doctor &&
                    (
                        <ul className='list-group'>
                            <li className='list-group-item'>
                                Apellido: {this.state.doctor.apellido}
                            </li>
                            <li className='list-group-item'>
                                Especialidad: {this.state.doctor.especialidad}
                            </li>
                            <li className='list-group-item'>
                                Salario: {this.state.doctor.salario}
                            </li>
                            <li className='list-group-item'>
                                Id Hospital: {this.state.doctor.idHospital}
                            </li>
                        </ul>
                    )
                }
            </div>
        )
    }
}
