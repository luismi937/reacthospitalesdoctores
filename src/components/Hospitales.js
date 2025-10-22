// Importo React y Component porque voy a crear un componente de clase
import React, { Component } from 'react'

// Importo Global para acceder a la URL base de la API de hospitales
import Global from './Global'

// Importo axios para hacer peticiones HTTP a la API
import axios from 'axios'

// Yo creo el componente Hospitales que extiende de Component
// Contiene la lógica para leer la lista de hospitales desde la API
export default class Hospitales extends Component {
    // Yo tomo la URL base desde el módulo Global
    url = Global.apiHospitales

    // Yo inicializo el estado local con un array vacío de hospitales
    state = {
        hospitales: []
    }

    // Yo defino una función para cargar los hospitales desde la API
    loadHospitales = () => {
        // Yo construyo la ruta del endpoint relativo
        let request = "webresources/hospitales"

        // Yo hago la petición GET usando axios y guardo la respuesta en el estado
        axios.get(this.url + request).then(response => {
            console.log("leyendo hospitales")
            // Yo actualizo el estado con los datos recibidos
            this.setState({
                hospitales: response.data
            })
        })
    }

    // Cuando el componente se monta, yo llamo a loadHospitales para traer los datos
    componentDidMount = () => {
        this.loadHospitales()
    }

    render() {
        // Yo renderizo una tabla con la lista de hospitales
        return (
            <div>
                <h1>Hospitales</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Direccion</th>
                            <th>Telefono</th>
                            <th>Camas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/*
                            Yo mapeo el array de hospitales que guardé en el estado.
                            Para cada hospital devuelvo una fila con sus campos.
                            Uso el índice como key (podría usar idhospital si está garantizado único).
                        */}
                        {this.state.hospitales.map((hospital, index) => {
                            return (
                                <tr key={index}>
                                    <td>{hospital.idhospital}</td>
                                    <td>{hospital.nombre}</td>
                                    <td>{hospital.direccion}</td>
                                    <td>{hospital.telefono}</td>
                                    <td>{hospital.camas}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}
