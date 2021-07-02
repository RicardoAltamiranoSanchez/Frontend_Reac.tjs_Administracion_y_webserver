import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
//para recuperar los props despues que se recargue la pagina es withRouter
import Axios from '../config/axios'

//debemos poner siempre con mayusculas la primera letra en una funcion en react marcar mucho errores por eso
const PrimeraPagina = (props) => {
    // Generar state como objet
    const [NuevoUsuario, GuardarNuevoUsuario] = useState({
        nombre: '',
        correo: '',
        password: '',
        descripcion: '',
        rol: ''
    })
    const AgregarNuevoUsuario = (e) => {
        e.preventDefault();
        console.log(e.target.name);
        console.log(e.target.value);
        GuardarNuevoUsuario({
            //Lo que hace es que va tomar una copia actual de useState
            ...NuevoUsuario,
            //Y vamos a reescribir solomente lo que el usuario este escribiendo
            [e.target.name]: [e.target.value]

        })

    }
    const CrearNuevoUsuario = (e) => {
        e.preventDefault();

        Axios.post('http://localhost:8080/Api/Usuarios', NuevoUsuario)
            .then(response => {

                console.log(response.data);
                console.log(NuevoUsuario);
                //lo ponemos en verdadero para refrescar la pagina
                props.guardarConsulta = (true);

                // Redireccionar
                props.history.push('/')
            })
    }

    return ( <Fragment>
        <h1 > Crear Usuario </h1>
         <div className = "container mt-5 py-5" >
        <div className = "row" >

        <div className = "col-12 mb-5 d-flex justify-content-center" >
        <Link to = { '/' }className = "btn btn-success text-uppercase py-2 px-5 font-weight-bold" > Regresar </Link> </div> 
        <div className = "col-md-8 mx-auto" >
        <form onSubmit = { CrearNuevoUsuario }className = "bg-white p-5 bordered" >

        <div className = "form-group" >
        <label htmlFor = "nombre" > Nombre Completo </label> 
        <input type = "text"
        className = "form-control form-control-lg"
        id = "nombre"
        name = "nombre"
        placeholder = "Nombre Completo Usuario"
        //Es una funcion de boton de react con onchange y metemos la funcion
        onChange = { AgregarNuevoUsuario }
        /> </div>
         <div className = "from-group" >
        <label htmlFor = 'correo' > Correo </label> 
        <input type = "email"
        className = "form-control form-control-"
        id = 'correo'
        name = 'correo'
        onChange = { AgregarNuevoUsuario }
        /> </div>

        <div className = "form-group" >
        <label htmlFor = "propietario" > Rol </label> 
        <input type = "text"
        className = "form-control form-control-lg"
        id = "rol"
        name = "rol"
        placeholder = "Rol Usuario"
        onChange = { AgregarNuevoUsuario }
        /> </div>

        <div className = "form-group" >
        <label htmlFor = "telefono" > Teléfono </label> <input type = "tel"
        className = "form-control form-control-lg"
        id = "telefono"
        name = "telefono"
        placeholder = "Teléfono"
        onChange = { AgregarNuevoUsuario }
        /> </div>

        <div className = "form-group" >
        <label htmlFor = "fecha" > Fecha Alta </label>
         <input type = "date"
        className = "form-control form-control-lg"
        id = "fecha"
        name = "fecha"
        onChange = { AgregarNuevoUsuario }
        /> </div>


        <div className = "form-group" >
        <label htmlFor = "hora" > Hora Alta </label>
         <input type = "time"
        className = "form-control form-control-lg"
        id = "hora"
        name = "hora"
        onChange = { AgregarNuevoUsuario }
        /> 
        </div> 
        <div className = "form-group" >
        <label htmlFor = "password" > Contraseña 
        </label> <input type = "password"
        className = "form-control"
        id = 'password'
        name = "password"
        onChange = { AgregarNuevoUsuario }
        /> </div>


        <div className = "form-group" >
        <label htmlFor = "descripcion" > Descripcion </label> 
        <textarea className = "form-control"
        name = "descripcion"
        rows = "3"

        onChange = { AgregarNuevoUsuario } >
        </textarea> </div> <
        input type = "submit"
        className = "btn btn-primary mt-3 w-100 p-3 text-uppercase font-weight-bold"
        value = "Crear Cuenta" / >
        </form> </div> 
        </div> </div>
         </Fragment>
    );
}

export default withRouter(PrimeraPagina);
//lo rodeamo para recuperar los props