import React,{Fragment} from 'react';
//El withRouter es para utilizar de nuevo los proopms ya se eliminan cuando estamos pasando a otra ruta
import { Link,withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import Axios from '../../config/axios';
var FormData = require('form-data');


const UsuarioInfo= (props) => {

  
  console.log(props.usuario);
  if(!props.usuario) {

    //Lo redirigimos ala pagina principal
    props.history.push('/');
    //Para quitar el error del navegador
    return null;    
};



 
 const {usuario:{nombre,descripcion,correo,rol,uid,img}} = props; 

 

console.log(img);
 
//Actualizamos Imagenes
const ActualizarImagen=async (e)=>{
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
    url:`/Api/uploads/usuarios/${uid}`,
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
props.history.push(`/Usuario/:${uid}`);
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
  
 //Hacemos una funcion para eliminar al cliente devbemos importar axios desde la configuracion y indicamos el id que vienen dentro de los props solo hacemos destrution 
const eliminarUsuario=(uid) => {


    Swal.fire({
        title: '¿Estas seguro?',
        text: "Un usuario ya no se puede recuperar",
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
            method:"DELETE",
            url:`/Api/Usuarios/${uid}`,
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
                    props.history.push('/');
                    console.log(respuesta);
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

<h1 className="my-5">Usuario: {nombre}</h1>

<div className="container mt-5 py-5">
    <div className="row">
        <div className="col-12 mb-5 d-flex justify-content-center">
            <Link to={'/'} className="btn btn-success text-uppercase py-2 px-5 font-weight-bold">Volver</Link>
        </div>

        <div className="col-md-8 mx-auto">
            <div className="list-group">
                <div className="p-5 list-group-item list-group-item-action flex-column align-items-center">
                    <div className="d-flex w-100 justify-content-between mb-4">
                        <h3 className="mb-3">{nombre}</h3>
                      

                        <small className="rol">
 <div className = "btn btn-success text-uppercase py-1 px-9 font-weight-bold   mb-3 "
  onClick= {ActualizarImagen}>Actualizar Imagen</div>
                            <h3>ID DEL USUARIO</h3>
                           <h2>{uid}</h2> 
                        </small>
                     
                    </div>

                     <img  src={img} />
                   
                    <p className="mb-0">
                        {descripcion}
                    </p>
                    <div className="fecha-alta">
                      <h3>Rol</h3>  <p> {rol}</p>
                       <h3>Correo</h3><p>{correo}</p>
                    </div> 

                    <div className="d-flex">
                        <button 
                            type="button"
                            className="text-uppercase py-2 px-5 font-weight-bold btn btn-danger col"
                            //el onClick lo utilizamos para cuando de click que haga la funcion que de pasamos 
                               //para eliminar debemos hacer un arrofuncion por si la mandamos por funcion no sale error
                            onClick={() =>{ eliminarUsuario(uid); }}
                            >
                            Eliminar;
                        </button>
         <Link to={`/ActualizarUsuario/${uid}`} key={uid} >
                        <button 
                        type="button"
                        className="text-uppercase py-2 px-5 font-weight-bold btn btn-success col"
                        >Actualizar &times;</button>
                                            </Link>
                    
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
       </Fragment>

   )


}
export default withRouter(UsuarioInfo);
//el whitRouter es para poder usar otravez los proops ya que se eliminan cada vez que entramos a otra ruta
