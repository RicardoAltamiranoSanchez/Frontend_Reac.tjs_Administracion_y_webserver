import React,{Fragment,useState} from 'react';
//El withRouter es para utilizar de nuevo los proopms ya se eliminan cuando estamos pasando a otra ruta
import { Link,withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import Axios from '../../config/axios';



const UsuarioInfo= (props) => {

  
  console.log(props.usuario);
  if(!props.usuario) {
    //Lo redirigimos ala pagina principal
    props.history.push('/');
    //Para quitar el error del navegador
    return null;
}
 const {usuario:{nombre,descripcion,correo,rol,uid}} = props;
  
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

         
            // Eliminado de la base de datos
            Axios.delete(`http://localhost:8080/Api/Usuarios/${uid}`)
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
                           <h3>{uid}</h3> 
                        </small>
                    </div>

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
                            Eliminar &times;
                        </button>
                        <button 
                        type="button"
                        className="text-uppercase py-2 px-5 font-weight-bold btn btn-success col"
                     
                        
                        
                        
                        
                        >Actualizar &times;</button>
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
