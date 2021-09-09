import React, { Fragment,useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import Axios from '../../config/axios';



const NuevoProducto = (props) => {
   //obtenemos el id de la url con props y de match a paramas despued el id hicimos destruracion

   const { match: { params } } = props;

const [NuevoProducto,GuardarProducto]=useState({

     nombre:'',
     precio:'',
     marca:'',
     descripcion:'',  
   })
 
   const agregarProducto=(e) => {
      e.preventDefault();
      console.log(e.target.name);
      console.log(e.target.value);
     
       GuardarProducto({
       ...NuevoProducto,
       [e.target.name]: e.target.value
       })}
   
   
   const crearProducto=(e) => {
      e.preventDefault();
      const {nombre,precio,marca,descripcion}=NuevoProducto;
 const token=JSON.parse(localStorage.getItem('Autenticacion'));
       console.log(NuevoProducto);
      Axios({
      method:"POST",
       url:`/Api/productos/${params.id}`,
       data:{nombre,precio,marca,descripcion
        
         },headers:{  'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept ",
    'x-token':`${token}` }


}).then((response)=>{
     Swal.fire({
                    position: 'top-end',
                     icon: 'success',
                     title: 'Producto Registrado con exito',
                     showConfirmButton: false,
                     timer: 1500
               })
       
                console.log(NuevoProducto);
             //lo ponemos en verdadero para refrescar la pagina sin un igual por que nos marca error
          props.guardarConsulta(true);
          // Redireccionar
          props.history.push('/Categorias');
          console.log(response.data);

} ).catch((error)=>{
 Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.errors[0].msg,
                    })
            console.log(error.response.data.errors[0].msg);
       
})   
 } 
   return (


      <Fragment>
       <h1 > Crear Producto </h1>
         <div className = "container mt-5 py-5" >
        <div className = "row" >

        <div className = "col-12 mb-5 d-flex justify-content-center" >
        <Link to = { '/Categorias' }className = "btn btn-success text-uppercase py-2 px-5 font-weight-bold" > Regresar </Link> </div> 
        <div className = "col-md-8 mx-auto" >
        <form onSubmit={crearProducto} className = "bg-black p-5 bordered" >

        <div className = "form-group" >
        <label htmlFor = "nombre" > Nombre  </label> 
        <input type = "text"
        className = "form-control form-control-lg"
        id = "nombre"
        name = "nombre"
        placeholder = "NOMBRE PRODUCTO"
        required 
        onChange={agregarProducto}
        //Es una funcion de boton de react con onchange y metemos la funcion
        
        /> </div>
         <div className = "from-group" >
        <label htmlFor = 'Precio' >Precio</label> 
        <input type = "number"
        className = "form-control form-control-lg"
        id = 'precio'
        name = 'precio'
        placeholder ="PRECIO"
        required 
        onChange={agregarProducto}
       /></div>

        <div className = "form-group" >
        <label htmlFor = "text" >Marca </label> 
        <input type = "text"
        className = "form-control form-control-lg"
        id = "marca"
        name = "marca"
        placeholder = "MARCA"
        required 
        onChange={agregarProducto}
        /> </div>
        <div className = "form-group" >
        <label htmlFor = "descripcion" > Descripcion </label> 
        <textarea className = "form-control"
        name = "descripcion"
        rows = "2" 
        placeholder = "DESCRIPCION"
        required 
        onChange={agregarProducto}
        >

        </textarea> </div> <input type = "submit"
        className = "btn btn-primary mt-3 w-100 p-3 text-uppercase font-weight-bold"
        value = "Crear Producto"/>
        </form> </div> 
        </div> </div>
      
      </Fragment>
   )


}
  
 export default withRouter(NuevoProducto);