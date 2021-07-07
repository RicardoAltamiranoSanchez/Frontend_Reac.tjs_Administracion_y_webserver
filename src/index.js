import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//Instalamos sweetalert2 para las alertas con npm install sweetalert2
//Pagina donde encontraras los codigos de sweetalert2 https://sweetalert2.github.io/#examples
//import Swal from 'sweetalert2';
reportWebVitals();

