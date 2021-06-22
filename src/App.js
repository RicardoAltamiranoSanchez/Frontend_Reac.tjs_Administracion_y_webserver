//para consumir las apis es con useEffect y useState
import React ,{useEffect,useState} from 'react';
//importamos la libreria para el envio de rutas o los paths
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import Practica from './components/prueba';
import primeraPagina from './components/primeraPagina';
import segundaPagina from './components/segundaPagina';
import Axios from './config/axios';


function App() {
  console.log(process.env.REACT_APP_BACKEND_URL);
   const [Usuarios,guardaUsuarios]=useState([]);
  //useEffect es un funcion que se ejecuta cuando hay cambios en el programa 
  useEffect(()=>{
     //consultamos la url ya no ponemos el local host por que ya la tenemos en una varible global
  const consultarApi= ()=>{
   
     Axios.get('http://localhost:8080/Api/Usuarios')
    .then(respuesta => {
   
      guardaUsuarios(respuesta.data);
    
    })
    .catch(err => console.log(err)) 

  }     
      consultarApi();
      
  },[])

  return (
  <Router>
   <Switch>
     <Route
     //utilizamos route para hacer el link o url de nuestro programas debemos crear los componentes de cada pagina que vamos a llamar
      //Asi se pasa la informacion que estemos consumiendo una api se pasa cuando quieras pasar useState o funcion se debe usar esta sintaxis
        exact path='/'
        component={()=> <Practica 
        Usuarios={Usuarios}  
        />}

     />
     <Route
     exact path='/primeraPagina'
     component={primeraPagina}
     />
     <Route
     exact path='/segundaPagina'
     component={segundaPagina}

     />
   </Switch>


  </Router>



  );
}

export default App;
//debemos instalar axios para hacer las peticiones ala api y obtener la informacion de la base de datos 
//npm install axios
