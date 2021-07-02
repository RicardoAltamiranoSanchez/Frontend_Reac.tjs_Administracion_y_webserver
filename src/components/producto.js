import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';

const ObtenerProducto=({Productos})=>{

    console.log(Productos)
    if(Productos.length === 0) {return null}

 

    return(

     <Fragment>

<h1 className="my-5">{Productos.msg}</h1>
<div className="container mt-5 py-5">
      <div className="row">
       <div className="col-12 mb-5 d-flex">
       <Link to={'/'} className="btn btn-success text-uppercase py-2 px-5 font-weight-bold  justify-content-center"> Regresar</Link> 
       </div>
       <div className="col-md-8 mx-auto">
      <div className="list-group">
        {Productos.productos.map((p)=>(
      //En react no se utiliza las etiquetas se utiliza otra cosa <a></a>  key es para tener un identificador unico utilizamos el iud de usuarios para eso       
      //debemos importar de react-douter-dom link ya que hace nuestra app mas rapida
      <a key={p._id} className ="p-5 list-group-item list-group-item-action flex-column align-items-start"> 
      <div className="d-flex w-100 justify-content-between mb-4">
      <h3 className="mb-3">Imagen</h3>
      <small class="fecha-alta">
      <h3>id producto</h3><p>{p._id}</p>
      <h3>nombre</h3><p>{p.nombre}</p>
      <h3>precio</h3><p>{p.precio}</p>
      <h3>Creado por</h3><p>{p.usuario.nombre}</p>
      <h3>id usuario</h3><p>{p.usuario._id}</p>
      </small>
      </div>
      <p className="mb-0">informacion del usuario</p>
      <div className="contacto py-3">informacion del usuario</div>
      <p>{p.nombre}</p>
      <p>Mas info del usuario</p>
      </a>
        ))}
      </div>
     </div>
      </div>
      </div>
      </Fragment>
    )
}
export default ObtenerProducto;