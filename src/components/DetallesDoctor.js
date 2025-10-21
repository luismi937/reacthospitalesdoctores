import React, { Component } from 'react'
import Global from './Global';
import axios from 'axios';
export default class DetallesDoctor extends Component {
    url = Global.apiDoctores
    state= {
        doctor:null
    }
    findDoctor = () =>{
        let request = "api/doctores/" + this.props.iddoctor;
        axios.get(this.url + request).then(response =>{
            console.log("leyendo doctores")
            this.setState({
                doctor:response.data
            })
        })
    }
    componentDidMount = ()=>{
        this.findDoctor();
    }
    componentDidUpdate = () =>{
        this.findDoctor();
    }
  render() {
    return (
      <div>
        <h1>DEtalles Doctor</h1>
        {
            this.state.doctor && 
            (<ul className='list-group'>
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
            </ul>)
        }

      </div>
    )
  }
}
