import React ,{Fragment} from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import Axios from '../config/axios';

const Practica = ({Usuarios}) => {
      console.log(Usuarios);
    if(Usuarios.length === 0 ){return null}
     const {total}=Usuarios;
 
    Usuarios.usuarios.forEach((usuarios) => {
        if(!usuarios.img){
           usuarios.img="../../assets/default.jpg";
        }
   
         
       
    });
 const Autenticacion= async (e)=>{
       e.preventDefault();
     console.log("Authenticando.....");
const { value: Autenticando } = await Swal.fire({
  title: 'Autenticación',
  html:
    ' <label htmlFor = "correo"> Correo</label><input type="email" placeholder="Escriba su Correo" id="correo"   class="swal2-input" />' +
    '<label htmlFor = "password">Contraseña</label><input type="password" placeholder="Escriba su contraseña"  id="password"  class="swal2-input" />',
  focusConfirm: false,
  preConfirm: () => {
    return [
      document.getElementById('correo').value,
      document.getElementById('password').value
    ]
  }
})
 
if (Autenticando) {
  
    let correo=Autenticando[0];
    let password=Autenticando[1];
    
   Axios({
    method:"POST",
    url:`http://localhost:8080/Api/authentication/login`,
    data:{correo:`${correo}`,password:`${password}`},


}).then((response)=>{
    localStorage.setItem("Autenticacion",JSON.stringify(response.data.msg));
  console.log(response.data.token);
}).catch((error)=>{
 console.log(error.response.data);

})

}
}
  
     
return ( 
<Fragment>

<h1 className="my-5">Administrador de Usuarios Total:{total}</h1>
<div className="container mt-5 py-5">
<div className="row">
      <div className="col-12 mb-5 d-flex">
       <Link to={'/CrearUsuario'} className="btn btn-success text-uppercase py-2 px-5 font-weight-bold">nuevo Usuario</Link> 
      </div>
      <div className="col-11 mb-5 ">
      <Link to={'/Categorias'}className="btn btn-success text-uppercase py-2 px-5 font-weight-bold">categorias</Link>
      </div>
      <div className="col-11 mb-5 ">
      <Link to={'/Productos'}className="btn btn-success text-uppercase py-2 px-5 font-weight-bold">Productos</Link>
      </div>
     <div className="col-11 mb-5 ">
       <Link className =" btn btn-success text-uppercase py-2 px-5 font-weight-bold" 
      
    onClick={Autenticacion}>Autenticacion</Link></div>
      <div className="col-md-8 mx-auto">
      <div className="list-group">
        {Usuarios.usuarios.map((u)=>(
      //En react no se utiliza las etiquetas se utiliza otra cosa <a></a>  key es para tener un identificador unico utilizamos el iud de usuarios para eso       
      //debemos importar de react-douter-dom link ya que hace nuestra app mas rapida
     
      <Link to={`/Usuario/${u.uid}`} key={u.uid} className ="p-5 list-group-item list-group-item-action flex-column align-items-start"> 
      <div className="d-flex w-100 justify-content-between mb-4">
      <h3 className="mb-3">{u.nombre}</h3>
     
      <small class="fecha-alta">
      <h3>Correo</h3><p>{u.correo}</p>
      <h3>Privilegios</h3><p>{u.rol}</p>
       
      </small>

      </div>

     
        <img src={u.img}/>
          


              <p className="mb-0">informacion del usuario</p>
      <div className="contacto py-3">informacion del usuario</div>
      <p>{u.description}</p>
      <p>Mas info del usuario</p>
      <Link to={`/Usuario/${u.uid}`} key={u.uid} className="btn btn-success text-uppercase py-2 px-5 font-weight-bold  justify-content-center"> mas detalle</Link> 
      </Link>
        ))}
      </div>
      </div>
      <div>
       
      </div>
     

</div>

</div>  
 </Fragment>
      );
}  
 
export default Practica;