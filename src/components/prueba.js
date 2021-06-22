import React ,{Fragment} from 'react';

const Practica = ({Usuarios}) => {
      console.log(Usuarios);
    if(Usuarios.length === 0 ){return null}
   
    Usuarios.usuarios.forEach((usuarios) => (
          console.log( usuarios.nombre)
    ));

return ( 
<Fragment>
<h1 className="my-5">Administrador de Usuarios</h1>
<div className="container mt-5 py-5">
<div className="row">

      <div className="col-12 mb-5 d-flex">

       <a hre="#" className="btn btn-success text-uppercase py-2 px-5 font-weight-bold"> Crear un nuevo Usuario</a> 
      </div>
      <div className="col-md-8 mx-auto">
      <div className="list-group">
        {Usuarios.usuarios.map((u)=>(

               <h3>{u.nombre}</h3>
        ))}

      </div>

      </div>

</div>

</div>  
 </Fragment>



      );
}  
 
export default Practica;