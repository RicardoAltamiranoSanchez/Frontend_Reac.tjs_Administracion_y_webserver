import React,{Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import Axios from '../config/axios';




const CategoriasPagina = ({Categorias,guardarConsulta},props) => {
    console.log(Categorias)
    if(Categorias.length === 0){return null}
    console.log(Categorias.msg);
    console.log(Categorias.categoria);
    Categorias.categoria.forEach(c=>{
        console.log(c)
    })
////////////////////////
//Eliminando Categoria//
///////////////////////
 const EliminarCategoria=async(e)=>{
     e.preventDefault();
     const { value : valor } = await Swal.fire({
  title: 'Eliminar  Categoria',
  input: 'text',
  inputLabel: 'Escriba el  id  de la Categoria a Eliminar',
  inputPlaceholder: 'Escriba el id '
})
if(valor){
   Axios({
      method:"DELETE",
     url:`http://localhost:8080/Api/${valor}`,
                   headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'x-token':`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MGE2OGNlOTcxOGU4YTNiMzRmZmNlNTUiLCJpYXQiOjE2Mjk3NjY1MzcsImV4cCI6MTYyOTc4MDkzN30.bLtqxE6C3dysv6u_8RgcPk7t6MCjJ6UV7uwlFBK_79I`}})

.then(response => {
     Swal.fire(` ${response.data.msg}`)
     console.log(response);
    
     guardarConsulta(true);
     //Redireccionar

}).catch((error)=>{


})
}
}
///////////////////////////
//Actualizando  Categoria//
///////////////////////////
 const ActualizarCategoria=async (e)=>{
    e.preventDefault();
 
const { value: valores } = await Swal.fire({
  title: 'Ingrese el id de la Categoria y el Nuevo nombre de la Categoria a Actualizar',
  html:
    '<input id="swal-input1" class="swal2-input" placeholder="Ingrese el id">' +
    '<input id="swal-input2" class="swal2-input"  placeholder="Ingrese el nombre">',
  focusConfirm: false,
  preConfirm: () => {
    return [
      document.getElementById('swal-input1').value,
      document.getElementById('swal-input2').value
    ]
  }
})

if (valores) {
    const id=valores[0];
    const resto=valores[1];
  
  Axios({
     method:'PUT',
     url:`http://localhost:8080/Api/categorias/${id}`,
      data:{'nombre':`${resto}`},
        headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'x-token':`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MGE2OGNlOTcxOGU4YTNiMzRmZmNlNTUiLCJpYXQiOjE2Mjk3NjY1MzcsImV4cCI6MTYyOTc4MDkzN30.bLtqxE6C3dysv6u_8RgcPk7t6MCjJ6UV7uwlFBK_79I`}})

    
.then(response => {

 Swal.fire(response.data.msg)
guardarConsulta(true);
})
.catch(error =>{ Swal.fire(`Error al momento de crear la nueva Categoria: ${error.response.data.msg}`); })

}

}
////////////////////////
//Creando Categoria//
///////////////////////
    const CrearCategorias = async (e)=>{
     e.preventDefault();
     const { value : valor } = await Swal.fire({
  title: 'Nueva Categoria',
  input: 'text',
  inputLabel: 'Escriba el nombre de una nueva categoria',
  inputPlaceholder: 'Escriba el nombre'
})
 

if (valor) {
  const NuevaCategoria={"nombre":`${valor[0]}`}
 
   console.log(valor);
   console.log(NuevaCategoria);
  Axios({
        method:"POST",
        url:"http://localhost:8080/Api/categorias",
        data:{'nombre':`${valor}`},
        headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'x-token':`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MGE2OGNlOTcxOGU4YTNiMzRmZmNlNTUiLCJpYXQiOjE2Mjk3NDkwMDcsImV4cCI6MTYyOTc2MzQwN30.ND9-oCQoci5daXBiHcv8G04kYXGUki64eEIHrB9qafE`}})
.then((response)=>{
     Swal.fire(`Listo Nueva Categoria Creada: ${response.data.msg}`)
     console.log(response);
    
     guardarConsulta(true);
     //Redireccionar
    
    console.log( response.data.msg);
    console.log('Actualizacion exitosa');
}).catch((error)=>{
       Swal.fire(`Error al momento de crear la nueva Categoria: ${error}`)
     console.log(error);

})

}




    }

   
    
    return ( <Fragment>
    <h1 className="my-5">{Categorias.msg}</h1>
<div className="container mt-5 py-5">
<div className="row">

      <div className="col-12 mb-5 d-flex ">

       <Link to={'/'} className="btn btn-success text-uppercase py-2 px-5 font-weight-bold  justify-content-center"> Regresar</Link> 
       <input  type="button"  className=" btn btn-success text-uppercase py2 
px-5 font-weight-bold" value="Crear Categoria"
         onClick={CrearCategorias} 
       />
       <input type="button"  className = "btn btn-info text-uppercase py2 px-5 font-weight-bold " value="Actualizaar Categoria"
       onClick={ActualizarCategoria}/>
       <input type="button" className="btn  btn-danger text-uppercase py2 px-5 font-weight-bold " value="Eliminar Categoria"
       onClick={EliminarCategoria}
   />     
 </div> 
     

      <div className="col-11 mb-5 ">
      <div className="col-md-8 mx-auto">
      </div>
      <div className="col-md-8 mx-auto">
      <div className="list-group">
        {Categorias.categoria.map((c)=>(
      //En react no se utiliza las etiquetas se utiliza otra cosa <a></a>  key es para tener un identificador unico utilizamos el iud de usuarios para eso       
      //debemos importar de react-douter-dom link ya que hace nuestra app mas rapida
      <Link to="/" key={c._id} className ="p-5 list-group-item list-group-item-action flex-column align-items-start"> 
      <div className="d-flex w-100 justify-content-between mb-4">
      <h3 className="mb-3">{c.nombre}</h3>
      <small class="fecha-alta">
      <h3>Identificador ID</h3><p>{c._id}</p>
      <h3>Creado por </h3><p>{c.usuario}</p>
    
      </small>
      
      </div>
      <Link to={`/NuevoProducto/${c._id}`} key="" className="btn btn-success text-uppercase py-2 px-5 font-weight-bold  justify-content-center">Crear Nuevo Producto</Link> 
       </Link>
        ))}

      </div>

      </div>

      </div>

</div>
</div>  
    


    </Fragment> );

}
export default CategoriasPagina;