import React,{Fragment} from 'react';
import {Link,withRouter } from 'react-router-dom';
import Axios from '../../config/axios';
import Swal from 'sweetalert2';
let nombreNuevo={
nombre:"",
correo:"",
descripcion:"",
rol:""

}
let Valor=[]
const ActualizarUsuario=(props) => {
    console.log("Desde la plantilla de Actualizar"+props);
    if(props.Usuario.length === 0 ){return null}
 let informacion=[]
const {match:{params}}=props; 
  const id=params.id;

  console.log(id);
  console.log("Desde el segundo console.log");
   console.log(props);

   Valor= props.Usuario.usuarios.filter((u)=>u.uid ===params.id);
   
const ObtenerDatos= (e)=>{
     if(e.target.name==="nombre"){
      nombreNuevo.nombre=e.target.value;
      }
    else if(e.target.name==="correo"){
       nombreNuevo.correo=e.target.value;
    }
    else if(e.target.name==="rol"){
      nombreNuevo.rol=e.target.value;
    }else if(e.target.name==="descripcion"){
      nombreNuevo.descripcion=e.target.value;
}
 
console.log(e.target.name+" "+e.target.value)
 
}


const ActualizarUsuarioPeticion=(e)=>{
      e.preventDefault();
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
 

       const {nombre,correo,rol,descripcion}=nombreNuevo;
      console.log("Desde actualizar usuario");
    try {
Axios({
    method:'PUT',
    url:`http://localhost:8080/Api/Usuarios/${id}`,
  data:{nombre,correo,rol,descripcion
               


} 
  
  
}).then((response)=>{
     //Lo ponemos en verdadero para refrescar la pagina sin un igual por que nos marca error
     Toast.fire({
      icon: 'success',
    title: `${response.data.msg}`
      })

     props.guardarConsulta(true);
     //Redireccionar
     props.history.push(`/Usuario/${id}`);
    console.log( response.data.msg);
    console.log('Actualizacion exitosa');
}).catch((error)=>{
 Toast.fire({
      icon: 'error',
    title: `${error.response.data.msg}`
      })
      console.log("Hubo un erro en el put del frontend de producto"+ error.response.data.msg);
  })     
    } catch (error) {
      console.log(`Error al actualizar el usuario ${error}`);
    }
  }
  return (
      <Fragment>
           
          <h1 >Actualizando al  Usuario </h1>
        
         <div className = "container mt-5 py-5" >
        <div className = "row" >

        <div className = "col-12 mb-5 d-flex justify-content-center" >
        <Link to={`/Usuario/${props.match.params.id}`} className = "btn btn-success text-uppercase py-2 px-5 font-weight-bold" > Regresar </Link> </div> 
        <div className = "col-md-8 mx-auto" >
        <form onSubmit = { ActualizarUsuarioPeticion } className = "bg-white p-5 bordered" >

        <div className = "form-group" >
        <label htmlFor = "nombre" > Nombre Completo </label> 
        <input type = "text"
        className = "form-control form-control-lg"
        id = "nombre"
        name = "nombre"
        
        placeholder={Valor[0].nombre}
        onChange={ObtenerDatos}
      
      
      //  placeholder ={props.usuario.nombre}
        //Es una funcion de boton de react con onchange y metemos la funcion
  //      onChange = {AgregarNuevoUsuario}
        /> </div>
         <div className = "from-group" >
        <label htmlFor = 'correo' > Correo </label> 
        <input type = "email"
        className = "form-control form-control-"
        id = 'correo'
        name = "correo"
        placeholder={Valor[0].correo}
        onChange = {ObtenerDatos}

       
    //    onChange = { AgregarNuevoUsuario }
        
        /> </div>

        <div className = "form-group" >
        <label htmlFor = "propietario" > Rol </label> 
        <input type = "text"
        className = "form-control form-control-lg"
        id = "rol"
        name = "rol"
        placeholder={Valor[0].rol}
            onChange = {ObtenerDatos}
      
   //     placeholder = {props.usuario.rol}
      //  onChange = { AgregarNuevoUsuario }
        /> </div>

        <div className = "form-group" >
        <label htmlFor = "telefono" > Teléfono </label> <input type = "tel"
        className = "form-control form-control-lg"
        id = "telefono"
        name = "telefono"
   
              onChange = {ObtenerDatos}
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
             onChange = {ObtenerDatos}
        /> </div>


        <div className = "form-group" >
        <label htmlFor = "hora" > Hora Alta </label>
         <input type = "time"
        className = "form-control form-control-lg"
        id = "hora"
        name = "hora"
  //      placeholder = {props.usuario.hora}
    //    onChange = { AgregarNuevoUsuario }
              onChange = {ObtenerDatos}
        /> 
        </div> 
        <div className = "form-group" >
        <label htmlFor = "password" > Contraseña 
        </label> <input type = "password"
        className = "form-control"
        id = 'password'
        name = "password"
      
  //      placeholder = {props.usuario.password}
    //    onChange = { AgregarNuevoUsuario }
              onChange = {ObtenerDatos}
        /> </div>


        <div className = "form-group" >
        <label htmlFor = "descripcion" > Descripcion </label> 
        <textarea className = "form-control"
        name = "descripcion"
        rows = "3"
            onChange = {ObtenerDatos}
        placeholder={Valor[0].descripcion}
        
  //      placeholder = {props.usuario.descripcion}
        
         >
        </textarea> </div> <input type = "submit"
        className = "btn btn-primary mt-3 w-100 p-3 text-uppercase font-weight-bold"
        value = "Actualizar"
       />
        </form> </div> 
        </div> </div>
        
      </Fragment>    
) 
}
export default withRouter(ActualizarUsuario);