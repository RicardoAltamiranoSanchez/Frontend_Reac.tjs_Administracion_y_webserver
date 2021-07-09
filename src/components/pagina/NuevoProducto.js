import React, { Fragment,useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Axios from '../../config/axios';



const NuevoProducto = (props) => {
   //obtenemos el id de la url con props y de match a paramas despued el id hicimos destruracion

   const { match: { params } } = props;

const [NuevoProducto,GuardarProducto]=useState({

     nombreProducto:'',
     precioProducto:'',
     marcaProducto:'',
     descripcionProducto:'',

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
 
       Axios.post(`http://localhost:8080/Api/productos/${params.id}`,NuevoProducto)
       .then((response) =>{
         
          //lo ponemos en verdadero para refrescar la pagina sin un igual por que nos marca error
          props.guardarConsulta(true);
          // Redireccionar
          props.history.push('/Categorias');
          console.log(response.data);
       })
       .catch((err) =>{
 
           console.log(err.response)
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
        id = "nombreProducto"
        name = "nombreProducto"
        placeholder = "NOMBRE PRODUCTO"
        required 
        onChange={agregarProducto}
        //Es una funcion de boton de react con onchange y metemos la funcion
        
        /> </div>
         <div className = "from-group" >
        <label htmlFor = 'Precio' >Precio</label> 
        <input type = "number"
        className = "form-control form-control-lg"
        id = 'precioProducto'
        name = 'precioProducto'
        placeholder ="PRECIO"
        required 
        onChange={agregarProducto}
       /></div>

        <div className = "form-group" >
        <label htmlFor = "text" >Marca </label> 
        <input type = "text"
        className = "form-control form-control-lg"
        id = "marcaProducto"
        name = "marcaProducto"
        placeholder = "MARCA"
        required 
        onChange={agregarProducto}
        /> </div>
        <div className = "form-group" >
        <label htmlFor = "descripcion" > Descripcion </label> 
        <textarea className = "form-control"
        name = "descripcionProducto"
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