//importamos axios
import axios from 'axios';
//es una funcion ya de axios creamos un objeto de pasamos como base la url 
//lo hacemos para no escribir el dominio
const Axios=axios.create({
   
    baseUrl:process.env.REACT_APP_BACKEND_URL //Aqui el erro donde no se puede ennviar el dominio solo lo estoy haciendo asi para no peder tiempo y continuar
});
export default Axios;