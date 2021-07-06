import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';
const CategoriasPagina = ({Categorias}) => {
    console.log(Categorias)
    if(Categorias.length === 0){return null}
    console.log(Categorias.msg);
    console.log(Categorias.categoria);
    Categorias.categoria.forEach(c=>{
        console.log(c)
    })

  
    


    


    return ( <Fragment>
    <h1 className="my-5">{Categorias.msg}</h1>
<div className="container mt-5 py-5">
<div className="row">

      <div className="col-12 mb-5 d-flex ">

       <Link to={'/'} className="btn btn-success text-uppercase py-2 px-5 font-weight-bold  justify-content-center"> Regresar</Link> 
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
      <Link to={'/'} className="btn btn-success text-uppercase py-2 px-5 font-weight-bold  justify-content-center"> Ir</Link> 
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