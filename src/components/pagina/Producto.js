import React,{Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Swal from 'sweetalert2';
import Axios from '../../config/axios'



const ProductoInfo=(props) => {

    if(!props.producto){ 
        
        props.history.push('/')
        
        return null;
     }
    const {nombre,_id,precio,categoria,usuario,img,descripcion}=props.producto;
const ProductoImagen= async  (e)=>{

  e.preventDefault();
const { value: files } = await Swal.fire({
  title: 'Seleccione una Imagen',
  input: 'file',
  inputAttributes: {
    'accept': 'image/*',
    'aria-label': 'Seleccione una Imagen'
  }
})
if (files) {
  const reader = new FileReader()
var form = new FormData();
  
  form.append('archivo',files);
console.log(form);
  reader.onload = (e) => {
    Swal.fire({
      title: 'Imagen Actualizada',
      imageUrl: e.target.result,
      imageAlt: 'Imagen Actualizada'
    })

  }
Axios({
   method:"PUT",
    url:`/Api/uploads/productos/${_id}`,
    data:form,
    headers:{
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
}
   

}).then((response)=>{
//Cargando Imagen para la Actualizacion
let timerInterval
Swal.fire({
  title: 'Actualizando....',
  html: 'Espere un momento <b></b> milisegundos.',
  timer: 5000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
    const b = Swal.getHtmlContainer().querySelector('b')
    timerInterval = setInterval(() => {
      b.textContent = Swal.getTimerLeft()
    }, 100)
  },
  willClose: () => {
    clearInterval(timerInterval);
console.log(response.data)
props.guardarConsulta(true);
  props.history.push('/Productos');
 reader.readAsDataURL(files);

console.log(files);

}})

}).catch((error)=>{
 let timerInterval
Swal.fire({
  title: 'Actualizando ....',
  html: 'Espere un momento <b></b> milisegundos.',
  timer: 2000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading()
    const b = Swal.getHtmlContainer().querySelector('b')
    timerInterval = setInterval(() => {
      b.textContent = Swal.getTimerLeft()
    }, 100)
  },
  willClose: () => {
    clearInterval(timerInterval)
   Swal.fire({ icon: 'error',
                title: 'Oops...',
                text: error.response.data.msg,});
  }
})
console.log(error);

})
 
}


}

 const eliminarProducto=(id)=>{
     
    Swal.fire({
        title: '¿Estas seguro?',
        text: "El Producto ya no podras recuperardo despues",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!',
        cancelButtonText:'Cancelar'
    }).then((result) => {
        if (result.value) {

         const token=JSON.parse(localStorage.getItem('Autenticacion'));
            // Eliminado de la base de datos
            Axios({
            method:'DELETE',
            url:`/Api/productos/${id}`,
            headers:{
 
     'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    'x-token':`${token}`


}


})
                .then(respuesta => {
                       // Alerta de eliminado
            Swal.fire(
                '¡Eliminado!',
                respuesta.data.msg,
                'éxito'
            )
                    props.guardarConsulta(true);
                    props.history.push('/Productos');
                    console.log(respuesta.data);
                })
                .catch(error => {
                //obtenemos el mensaje con error.response
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.msg,
                    })
                console.log(error.response.data);
            })
        }
    })

 }
 return(
 
 <Fragment>

 
<h1 className="my-5">Producto:{nombre}</h1>

<div className="container mt-5 py-5">
    <div className="row">
        <div className="col-12 mb-4 d-flex justify-content-center">
            <Link to={'/Productos'} className="btn btn-success text-uppercase py-2 px-5 font-weight-bold">Volver</Link>
        </div>

        <div className="col-md-7 mx-auto">
            <div className="list-group">
                <div className="p-5 list-group-item list-group-item-action flex-column align-items-center">
                    <div className="d-flex w-100 justify-content-between mb-4">
                     
                       <p><img src={img} width="300" height="266"/></p> 
                        
                        <small className="fecha-alta">
<div className = "btn btn-success text-uppercase py-1 px-9 font-weight-bold   mb-1 "
  onClick= {ProductoImagen}>Actualizar Imagen</div>
                           <h3>Nombre</h3>
                            <p> {nombre}</p>
                           <h3>id producto</h3>
                           <p>{_id}</p>
                           <h3>Categoria</h3>
                           <p>{categoria._id}</p>
                           <p>{categoria.nombre}</p>
                           <h3>Creado por</h3>
                           <p>{usuario._id}</p>
                           <p>{usuario.nombre}</p>
                         
                        </small>
                            

                    </div>
                            

                    <p className="mb-0">
                        
                    </p>
                    <div className="fecha-alta">
                      
                      <h3>precio</h3><p>{precio}</p>
                    <h3>Descripcion</h3><p>{descripcion}</p>
                     
                    </div> 

                    <div className="d-flex">
                        <button 
                            type="button"
                            className="text-uppercase py-2 px-5 font-weight-bold btn btn-danger col"
                            onClick={()=>{eliminarProducto(_id)}}
                        >
                            Eliminar &times;
                        </button>
                 <Link to={`/ActualizarProducto/${_id}`} key={_id}>       <button 
                        type="button"
                        className="text-uppercase py-2 px-5 font-weight-bold btn btn-success col"
                            
                        >Actualizar</button></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

     </Fragment>

);


}

export default withRouter(  ProductoInfo);