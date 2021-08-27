import React ,{Fragment} from 'react';
import {withRouter,Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import Axios from '../../config/axios'
let NuevoProducto={
nombre:"",
precio:0,
marca:"",
descripcion:""

}
let Producto=[]
const ActualizarProducto=(props)=>{
  console.log("Desde la plantilla de Actualizar"+props);
    if(props.Productos.length === 0 ){return null}
const {match: { params }}= props;
const {id}=params;
Producto=props.Productos.productos.filter((p)=>p._id===params.id)
console.log(Producto);
   
const ObtenerDatos= (e)=>{
     if(e.target.name==="nombre"){
      NuevoProducto.nombre=e.target.value;
      }
    else if(e.target.name==="precio"){
       NuevoProducto.precio=e.target.value;
    }
    else if(e.target.name==="marca"){
      NuevoProducto.marca=e.target.value;
    }else if(e.target.name==="descripcion"){
      NuevoProducto.descripcion=e.target.value;
}
 
console.log(e.target.name+" "+e.target.value)
 
}
const ActualizarNuevoProducto=(e)=>{
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
   const {nombre,precio,marca,descripcion}=NuevoProducto;
console.log("Desde la actualizacion del nuevo producto");

 try{
     Axios({
     method:"PUT",
    url:`http://localhost:8080/Api/productos/${id}`,
     data:{nombre,precio,marca,descripcion
},  headers:{
      
     'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    'x-token':JSON.parse(localStorage.getItem('Autenticacion'))
}

}).then((response)=>{
    //Lo ponemos en verdadero para refrescar la pagina sin un igual por que nos marca error
     Toast.fire({
      icon: 'success',
    title: `${response.data.msg}`
      })

     props.guardarConsulta(true);
     //Redireccionar
     props.history.push(`/ProductoInfo/${id}`);
    console.log( response.data.msg);
    console.log('Actualizacion exitosa');

}).catch((error)=>{
 Toast.fire({
      icon: 'error',
    title: `${error.response.data.msg}`
      })
     console.log(`Hubo un error al momento de enviara la peticion de producto en actualizar ${error}`);

})
     

}catch(error){
    console.log(`Hubo un error desde la peticion de actualizar el producto`);
}



}

return(
<Fragment>

 <h1 >Actualizar Producto </h1>
         <div className = "container mt-5 py-5" >
        <div className = "row" >

        <div className = "col-12 mb-5 d-flex justify-content-center" >
        <Link to = { `/ProductoInfo/${id}`}className = "btn btn-success text-uppercase py-2 px-5 font-weight-bold" > Regresar </Link> </div> 
        <div className = "col-md-8 mx-auto" >
        <form onSubmit={ActualizarNuevoProducto} className = "bg-black p-5 bordered" >

        <div className = "form-group" >
        <label htmlFor = "nombre" > Nombre  </label> 
        <input type = "text"
        className = "form-control form-control-lg"
        id = "nombre"
        name = "nombre"
        placeholder = {Producto[0].nombre}
        onChange={ObtenerDatos}
    
        //Es una funcion de boton de react con onchange y metemos la funcion
        
        /> </div>
         <div className = "from-group" >
        <label htmlFor = 'Precio' >Precio</label> 
        <input type = "number"
        className = "form-control form-control-lg"
        id = 'precio'
        name = 'precio'
        placeholder ={Producto[0].precio}
        onChange= {ObtenerDatos}
       /></div>

        <div className = "form-group" >
        <label htmlFor = "text" >Marca </label> 
        <input type = "text"
        className = "form-control form-control-lg"
        id = "marca"
        name = "marca"
        placeholder = {Producto[0].marca}
        
        onChange={ObtenerDatos}
        /> </div>
        <div className = "form-group" >
        <label htmlFor = "descripcion" > Descripcion </label> 
        <textarea className = "form-control"
        name = "descripcion"
        rows = "2" 
        placeholder = {Producto[0].descripcion}
      
        onChange={ObtenerDatos}
        >

        </textarea> </div> <input type = "submit"
        className = "btn btn-primary mt-3 w-100 p-3 text-uppercase font-weight-bold"
        value = "Actualizar Producto"/>
        </form> </div> 
        </div> </div>
      

</Fragment>

)




}
export default withRouter(ActualizarProducto);