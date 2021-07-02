import React,{Fragment,useState} from 'react';
//El withRouter es para utilizar de nuevo los proopms ya se eliminan cuando estamos pasando a otra ruta
import {  withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';


const UsuarioInfo= (props) => {

  
  console.log(props.usuario);
  if(!props.usuario) {
    //Lo redirigimos ala pagina principal
    props.history.push('/');
    //Para quitar el error del navegador
    return null;
}
 const {usuario:{nombre,descripcion,correo,rol,uid}} = props;
   
      
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
                            
                        >
                            Eliminar &times;
                        </button>
                        <button 
                        type="button"
                        className="text-uppercase py-2 px-5 font-weight-bold btn btn-success col"
                            
                        >Actualizar</button>
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
