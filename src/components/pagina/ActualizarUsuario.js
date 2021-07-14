import React,{Fragment,useState} from 'react';
import {Link,withRouter } from 'react-router-dom';
import Axios from '../../config/axios'
const ActualizarUsuario=(props) => {
    
  const {match:{params}}=props;   
   const [Actualizar,ActualizarGuardar] = useState({
      nombre:'',
      correo:'',
      password:'',
      descripcion:'',
      rol:'',
})
   

    
    const id=params.uid;
  
  console.log(props.usuario);

  const AgregarNuevoUsuario=(e)=>{
     e.preventDefault();

     console.log(e.target.name);
     console.log(e.target.value);
      ActualizarGuardar({
        
     ...Actualizar,
      [e.target.name]:e.target.value


      }) 
     


  }

  const ActualizarUsuario=()=>{
  Axios.put(`http://localhost:8080/Api/Usuarios/${id}`,Actualizar)
  .then((response)=>{
     //Lo ponemos en verdadero para refrescar la pagina sin un igual por que nos marca error
     props.guardarConsulta(true);
     //Redireccionar
     props.history.push(`/Usuario/${props.usuario.uid}`);
    console.log( response);


  }).catch((err)=>{

      console.log("Hubo un erro en el put del frontend"+err.response);

  })
       


  }

  return (
      <Fragment>
           
          <h1 >Actualizando al  Usuario </h1>
        
         <div className = "container mt-5 py-5" >
        <div className = "row" >

        <div className = "col-12 mb-5 d-flex justify-content-center" >
        <Link to={`/Usuario/${props.usuario.uid}`} className = "btn btn-success text-uppercase py-2 px-5 font-weight-bold" > Regresar </Link> </div> 
        <div className = "col-md-8 mx-auto" >
        <form onSubmit = { ActualizarUsuario }className = "bg-white p-5 bordered" >

        <div className = "form-group" >
        <label htmlFor = "nombre" > Nombre Completo </label> 
        <input type = "text"
        className = "form-control form-control-lg"
        id = "nombre"
        name = "nombre"
        placeholder ={props.usuario.nombre}
        //Es una funcion de boton de react con onchange y metemos la funcion
        onChange = {AgregarNuevoUsuario}
        /> </div>
         <div className = "from-group" >
        <label htmlFor = 'correo' > Correo </label> 
        <input type = "email"
        className = "form-control form-control-"
        id = 'correo'
        name = 'correo'
        onChange = { AgregarNuevoUsuario }
        value={props.usuario.correo}
        /> </div>

        <div className = "form-group" >
        <label htmlFor = "propietario" > Rol </label> 
        <input type = "text"
        className = "form-control form-control-lg"
        id = "rol"
        name = "rol"
        placeholder = {props.usuario.rol}
        onChange = { AgregarNuevoUsuario }
        /> </div>

        <div className = "form-group" >
        <label htmlFor = "telefono" > Teléfono </label> <input type = "tel"
        className = "form-control form-control-lg"
        id = "telefono"
        name = "telefono"
        placeholder = {props.usuario.telefono}
        onChange = { AgregarNuevoUsuario }
        /> </div>

        <div className = "form-group" >
        <label htmlFor = "fecha" > Fecha Alta </label>
         <input type = "date"
        className = "form-control form-control-lg"
        id = "fecha"
        name = "fecha"
        placeholder ={props.usuario.fecha}
        onChange = { AgregarNuevoUsuario }
        /> </div>


        <div className = "form-group" >
        <label htmlFor = "hora" > Hora Alta </label>
         <input type = "time"
        className = "form-control form-control-lg"
        id = "hora"
        name = "hora"
        placeholder = {props.usuario.hora}
        onChange = { AgregarNuevoUsuario }
        /> 
        </div> 
        <div className = "form-group" >
        <label htmlFor = "password" > Contraseña 
        </label> <input type = "password"
        className = "form-control"
        id = 'password'
        name = "password"
        placeholder = {props.usuario.password}
        onChange = { AgregarNuevoUsuario }
        /> </div>


        <div className = "form-group" >
        <label htmlFor = "descripcion" > Descripcion </label> 
        <textarea className = "form-control"
        name = "descripcion"
        rows = "3"
        placeholder = {props.usuario.descripcion}

        onChange = { AgregarNuevoUsuario } >
        </textarea> </div> <input type = "submit"
        className = "btn btn-primary mt-3 w-100 p-3 text-uppercase font-weight-bold"
        value = "Actualizar"/>
        </form> </div> 
        </div> </div>
        
      </Fragment>  
   
) 
}


export default withRouter(ActualizarUsuario);