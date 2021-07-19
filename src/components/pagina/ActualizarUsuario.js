import React,{Fragment,useState} from 'react';
import {Link,withRouter } from 'react-router-dom';
import Axios from '../../config/axios'


const ActualizarUsuario=(props) => {
    console.log("Desde la plantilla de Actualizar"+props);
    if(props.Usuario.length === 0 ){return null}
  
  
const {match:{params}}=props; 
    
  const id=params.uid;
  console.log(id);
  console.log("Desde el segundo console.log");
   console.log(props);
   const Valor= props.Usuario.usuarios.filter((u)=>u.uid === props.match.params.id);
   const {correo,descripcion,nombre,rol} =Valor[0];

  let NuevoObjeto={

    nombre:"",
    correo:""

  };

   const Actualizando=(e)=>{
     
      console.log(e.target.name);
      console.log(e.target.value);
      if(e.target.name==="nombre"){

          nombre=e.target.value;

      }if(e.target.name ==="correo"){
           correo=e.target.value;

      }
      if(e.target.name ==="descripcion"){

        descripcion=e.target.value;
      }

      return {nombre,correo,descripcion}
      
    }  
  const N=Actualizando();

   console.log(Valor);
    console.log("Desde el objeto Actualizar");
    console.log(Actualizando); 
  
  const ActualizarUsuario=()=>{
  Axios.put(`http://localhost:8080/Api/Usuarios/${props.math.params.id}`,N)
  .then((response)=>{
     //Lo ponemos en verdadero para refrescar la pagina sin un igual por que nos marca error
     props.guardarConsulta(true);
     //Redireccionar
     props.history.push(`/Usuario/${props.math.params.id}`);
    console.log( response);
    console.log('Actualizacion exitosa');


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
        <Link to={`/Usuario/${props.match.params.id}`} className = "btn btn-success text-uppercase py-2 px-5 font-weight-bold" > Regresar </Link> </div> 
        <div className = "col-md-8 mx-auto" >
        <form onSubmit = { ActualizarUsuario }className = "bg-white p-5 bordered" >

        <div className = "form-group" >
        <label htmlFor = "nombre" > Nombre Completo </label> 
        <input type = "text"
        className = "form-control form-control-lg"
        id = "nombre"
        name = "nombre"

        placeholder={nombre}
        onChange={Actualizando}
      //  placeholder ={props.usuario.nombre}
        //Es una funcion de boton de react con onchange y metemos la funcion
  //      onChange = {AgregarNuevoUsuario}
        /> </div>
         <div className = "from-group" >
        <label htmlFor = 'correo' > Correo </label> 
        <input type = "email"
        className = "form-control form-control-"
        id = 'correo'
        name = 'correo'
        placeholder={correo}
        onChange={Actualizando}
    //    onChange = { AgregarNuevoUsuario }
        
        /> </div>

        <div className = "form-group" >
        <label htmlFor = "propietario" > Rol </label> 
        <input type = "text"
        className = "form-control form-control-lg"
        id = "rol"
        name = "rol"
        placeholder={rol}
        onChange={Actualizando}
   //     placeholder = {props.usuario.rol}
      //  onChange = { AgregarNuevoUsuario }
        /> </div>

        <div className = "form-group" >
        <label htmlFor = "telefono" > Teléfono </label> <input type = "tel"
        className = "form-control form-control-lg"
        id = "telefono"
        name = "telefono"
        onChange = { Actualizando }
  //      placeholder = {props.usuario.telefono}
      //  onChange = { AgregarNuevoUsuario }
        /> </div>

        <div className = "form-group" >
        <label htmlFor = "fecha" > Fecha Alta </label>
         <input type = "date"
        className = "form-control form-control-lg"
        id = "fecha"
        name = "fecha"
  //      placeholder ={props.usuario.fecha}
      //  onChange = { AgregarNuevoUsuario }
        /> </div>


        <div className = "form-group" >
        <label htmlFor = "hora" > Hora Alta </label>
         <input type = "time"
        className = "form-control form-control-lg"
        id = "hora"
        name = "hora"
  //      placeholder = {props.usuario.hora}
    //    onChange = { AgregarNuevoUsuario }
        /> 
        </div> 
        <div className = "form-group" >
        <label htmlFor = "password" > Contraseña 
        </label> <input type = "password"
        className = "form-control"
        id = 'password'
        name = "password"
        onChange = {Actualizando}
  //      placeholder = {props.usuario.password}
    //    onChange = { AgregarNuevoUsuario }
        /> </div>


        <div className = "form-group" >
        <label htmlFor = "descripcion" > Descripcion </label> 
        <textarea className = "form-control"
        name = "descripcion"
        rows = "3"
        name={descripcion}
        onChange={Actualizando}
  //      placeholder = {props.usuario.descripcion}

         >
        </textarea> </div> <input type = "submit"
        className = "btn btn-primary mt-3 w-100 p-3 text-uppercase font-weight-bold"
        value = "Actualizar"/>
        </form> </div> 
        </div> </div>
        
      </Fragment>    
) 
}
export default withRouter(ActualizarUsuario);