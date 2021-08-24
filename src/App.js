//para consumir las apis es con useEffect y useState
import React, { useEffect, useState } from 'react';
//importamos la libreria para el envio de rutas o los paths
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Practica from './components/prueba';
import PrimeraPagina from './components/primeraPagina';
import CategoriasPagina from './components/segundaPagina';
import UsuarioInfo from './components/pagina/Usuario';
import ProductoInfo from './components/pagina/Producto';
import NuevoProducto from './components/pagina/NuevoProducto'
import ObtenerProducto from './components/producto';
import ActualizarUsuario from './components/pagina/ActualizarUsuario';
import ActualizarProducto from './components/pagina/ActualizarProducto'
import Axios from './config/axios';
function App() {
    console.log(process.env.REACT_APP_BACKEND_URL);
    const [Usuarios, guardaUsuarios] = useState([]);
    const [Categorias, guardarCategorias] = useState([]);
    const [Productos, guardarProductos] = useState([]);
    const [consulta, guardarConsulta] = useState(true);
 
    //useEffect es un funcion que se ejecuta cuando hay cambios en el programa 
    useEffect(() => {
        //Creamos un useState para que se recargue la pagina cada vez que insertamos algo 
        if (consulta) {
            //consultamos la url ya no ponemos el local host por que ya la tenemos en una varible global
            const consultarApi = () => {
                Axios.get('http://localhost:8080/Api/Usuarios')
                    .then(respuesta => {
                        guardaUsuarios(respuesta.data);
                        // lo cambiamos en falso para no que no recargue la pagina
                        guardarConsulta(false);
                    })
                    .catch(err => console.log(err))
            }
            //Consultamos en la ruta categoria de nuestra api
            const ConsultarCategorias = () => {
                Axios.get('http://localhost:8080/Api/categorias')
                    .then((response) => {
                        guardarCategorias(response.data);

                    })
                    .catch(err => console.log(err));

            }
            const ConsultarProductos = () => {
                Axios.get('http://localhost:8080/Api/productos')
                    .then((response) =>

                        guardarProductos(response.data)
                    )
                    .catch(err => console.log(err))
            }
    

            ConsultarProductos();
            ConsultarCategorias();
            consultarApi();
           
            
        }
    }, [consulta]);
    //de eciamos en consulata en corchetes que cuando ese cambie este atento y vuelva a ejecutar ese codigo para eso es el

    return (
        
        <Router >
            <Switch >
            <Route
            //utilizamos route para hacer el link o url de nuestro programas debemos crear los componentes de cada pagina que vamos a llamar
            //Asi se pasa la informacion que estemos consumiendo una api se pasa cuando quieras pasar useState o funcion se debe usar esta sintaxis
            exact path = '/'
            component = {
                () => < Practica
                Usuarios = { Usuarios }
                  
                />}

                />

                <Route
                exact path = '/CrearUsuario'
                component = {
                    () => <PrimeraPagina
                    guardarConsulta = { guardarConsulta }
                    />} />

                    <Route
                    exact path = '/Categorias'
                    component = {
                        () => <CategoriasPagina
                        Categorias = { Categorias }
                        guardarConsulta= { guardarConsulta }

                        />} />
                        <Route
                        exact path = '/Productos'
                        component = {
                            () => <ObtenerProducto
                            Productos = { Productos }
                          />}

                            />
                            <Route
                            exact path ='/Usuario/:id'
                            render={(props) =>{
                             //La variable Usuarios que utilizamos en ela busqueda en la del useState   
                             //Hay que revisar bien los parametro que pones aqui tuve mucho problemas para importarlo solo por poner un id y ya de habia destivado el valor id 
                             //solo hay que revisar  y aqui hacemos que nos devuelve un valor especifico
                            const Usuario= Usuarios.usuarios.filter((usuario) =>usuario.uid === props.match.params.id);
                            

                            return (
                                <UsuarioInfo
                                //Lo ponenomos en cero nos la funcion filter hace una copia del arreglo completo
                                usuario={Usuario[0]}
                                guardarConsulta={guardarConsulta}

                                />
                            )
                            } }
                            />

                            <Route
                            exact path ='/ProductoInfo/:id'
                            render={(props) => {
                            const Producto =Productos.productos.filter((producto)=> producto._id === props.match.params.id);
                              return (
                             <ProductoInfo
                              producto={Producto[0]}
                              guardarConsulta= { guardarConsulta }
                              />

                              )
                            }}
                            />
                           <Route 
                            exact path = '/NuevoProducto/:id'
                            component = { ()=> <NuevoProducto
                            guardarConsulta={guardarConsulta}                            
                         />}                         
                         />
                         <Route
                            exact path ='/ActualizarUsuario/:id'                                                         
                              component={ () => <ActualizarUsuario 
                              guardarConsulta= { guardarConsulta }
                              Usuario={Usuarios}
                              />  }
                                                    
                            />
                             <Route
                             exact path='/ActualizarProducto/:id'
                             component={()=><ActualizarProducto
                              guardarConsulta= { guardarConsulta }
                             Productos={ Productos}
                       />}

       />
                       
                       
                         
                             </Switch>
                            </Router>
                        );
                    }
                    export default App;
                    //debemos instalar axios para hacer las peticiones ala api y obtener la informacion de la base de datos 
                    //npm install axios