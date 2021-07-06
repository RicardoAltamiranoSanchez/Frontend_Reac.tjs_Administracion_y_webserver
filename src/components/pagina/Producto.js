import React,{Fragment} from 'react';
import {Link } from 'react-router-dom';




const ProductoInfo=(props) => {

    if(!props.producto){ 
        
        props.history.push('/')
        
        return null;
     }
    const {nombre,_id,precio,categoria,usuario}=props.producto;

 return(
 
 <Fragment>

 
<h1 className="my-5">Producto:{nombre}</h1>

<div className="container mt-5 py-5">
    <div className="row">
        <div className="col-12 mb-5 d-flex justify-content-center">
            <Link to={'/Productos'} className="btn btn-success text-uppercase py-2 px-5 font-weight-bold">Volver</Link>
        </div>

        <div className="col-md-8 mx-auto">
            <div className="list-group">
                <div className="p-5 list-group-item list-group-item-action flex-column align-items-center">
                    <div className="d-flex w-100 justify-content-between mb-4">
                        <h3 className="mb-3">{nombre}</h3>
                        <small className="fecha-alta">
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
                       <h3>Imagen</h3><p></p>
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

);


}

export default ProductoInfo;