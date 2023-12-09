// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.



/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {

  /* ---------------- variables globales y llamado a funciones ---------------- */
  const url = "https://todo-api.ctd.academy/v1";
  const btnCerrarSesion = document.getElementById("closeApp");
  const jwtLogin = localStorage.getItem("jwt-login");
  const settings = {
    method:"GET",
    headers: {
    "Content-Type": "application/json",
    "authorization": `${jwtLogin}`
    }
  };
  //const settingsTarea = {};
  let nombreUsuario = "";
  let apellidoUsuario = "";
  let arrayTareas = [];
  const usernameP = document.getElementById("username");
  const formCrearTarea = document.getElementById("form-crear-tarea");
  const inputDescripcion = document.getElementById("nuevaTarea");
  const listaTareasPendientes = document.getElementById("tareas-pendientes");


  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener('click', function () {
    localStorage.clear();
    location.replace("./index.html");
  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {
   fetch(`${url}/users/getMe`, settings)
   .then(function(response){
      return response.json();
   }).then(function(data){
      nombreUsuario = data.firstName;
      apellidoUsuario = data.lastName;
      usernameP.innerText = `${nombreUsuario} ${apellidoUsuario}`;
   }).catch(function(error){
      console.log(error);
      location.replace("./index.html");
   });
  };
  obtenerNombreUsuario();


  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {
    fetch(`${url}/tasks`, settings)
   .then(function(response){
      return response.json();
   }).then(function(data){
      arrayTareas = data;
      renderizarTareas(arrayTareas);
      // aca si hay tareas se tendrían que actualizar en mis-tareas.html.
   }).catch(function(error){
      console.log(error);
   });
  };
  consultarTareas();


  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */

  formCrearTarea.addEventListener('submit', function (event){
    event.preventDefault();
    const payload = {
      description: inputDescripcion.value,
      completed: false
    }
    const settingsNuevaTarea = {
      method:"POST",
      headers: {
      "Content-Type": "application/json",
      "authorization": `${jwtLogin}`
      },
      body: JSON.stringify(payload)
    };
    fetch(`${url}/tasks`, settingsNuevaTarea)
    .then(function(response){
      return response.json();
    }).then(function(data){
      arrayTareas.push(data);
      renderizarTareas(arrayTareas);
    }).catch(function(error){
      console.log(error);
    })
  });


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareas(listado) {
    arrayTareas.forEach(tarea => {
      listaTareasPendientes.innerHTML += ``;
    });






  };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  function botonesCambioEstado() {
    
    



  }


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {
   
    

    

  };
});