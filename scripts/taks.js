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

  let nombreUsuario = "";
  let apellidoUsuario = "";
  let arrayTareas = [];
  let arrayTareasPendientes = [];
  let arrayTareasFinalizadas = [];
  const usernameP = document.getElementById("username");
  const formCrearTarea = document.getElementById("form-crear-tarea");
  const inputDescripcion = document.getElementById("nuevaTarea");
  const listaTareasPendientes = document.getElementById("tareas-pendientes");
  const listaTareasFinalizadas = document.getElementById("tareas-finalizadas");
  const cantidadTareasFinalizadas = document.getElementById("cantidad-finalizadas");
  let contadorTareasFinalizadas = 0;


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
  function dividirTareas(arrayADividir){
    arrayADividir.forEach(tarea => {
      console.log("dividiendo");
      if(tarea.completed == false){
        arrayTareasPendientes.push(tarea);
      }else if(tarea.completed == true){
        arrayTareasFinalizadas.push(tarea);
      };
    });
  };


  function consultarTareas() {
    fetch(`${url}/tasks`, settings)
   .then(function(response){
      return response.json();
   }).then(function(data){
      arrayTareas = data;
      dividirTareas(arrayTareas);
      renderizarTareasPendientes();
      renderizarTareasFinalizadas();
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
      arrayTareasPendientes.push(data);
      renderizarTareasPendientes();
    }).catch(function(error){
      console.log(error);
    })
  });


  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */
  function renderizarTareasFinalizadas(){
    listaTareasFinalizadas.innerHTML = "";
    contadorTareasFinalizadas = 0;
    arrayTareasFinalizadas.forEach(tarea => {
      contadorTareasFinalizadas++;
      listaTareasFinalizadas.innerHTML += `
      <li class="tarea descripcion" id="${tarea.id}">
        <p>${tarea.description}</p>
        <button>Eliminar tarea</button>
      </li>
      `;
    });
    cantidadTareasFinalizadas.innerText = contadorTareasFinalizadas;
  }

  function renderizarTareasPendientes() {
    listaTareasPendientes.innerHTML = "";
    arrayTareasPendientes.forEach(tarea => {
      listaTareasPendientes.innerHTML += `
      <li class="tarea descripcion" id="${tarea.id}">
        <p>${tarea.description}</p>
        <button>Cambiar a finalizada</button>
        <button>Eliminar tarea</button>
      </li>
      `;
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */

  
  function eliminarTareaPorId(idAEliminar){
    let indexAEliminar = arrayTareasPendientes.findIndex(x => x.id === idAEliminar);
    if(indexAEliminar !== -1){
    arrayTareasPendientes.splice(indexAEliminar, 1);
    };
    renderizarTareasPendientes();
  };

  function botonesCambioEstado(idTarea) {
    const payloadCambioEstado = {
      completed: true
    };
    const settingsCambioEstado = {
      method:"PUT",
      headers: {
      "Content-Type": "application/json",
      "id": `${idTarea}`,
      "authorization": `${jwtLogin}`
      },
      body: JSON.stringify(payloadCambioEstado)
    };
    fetch(`${url}/tasks/${idTarea}`, settingsCambioEstado)
    .then(function(response){
      return response.json();
    }).then(function(data){
      arrayTareasFinalizadas.push(data);
      renderizarTareasFinalizadas();
    }).catch(function(error){
      console.log(error);
    });
  };

  listaTareasPendientes.addEventListener("click", function(event){
    if(event.target.tagName === 'BUTTON'){
      let liTarea = event.target.closest(".tarea");
      if(liTarea){
        let textoBoton = event.target.textContent.trim();
        if(textoBoton === "Cambiar a finalizada"){
          botonesCambioEstado(liTarea.id);
          eliminarTareaPorId(parseInt(liTarea.id));
        }else if(textoBoton === "Eliminar tarea"){
          botonBorrarTarea(parseInt(liTarea.id));
        }
      }
    }
  });


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function deleteTarea(idDelete){
    let indexToDelete = arrayTareasPendientes.findIndex(x => x.id === idDelete);
    if(indexToDelete !== -1){
      arrayTareasPendientes.splice(indexToDelete, 1);
      renderizarTareasPendientes();
    }else if(indexToDelete === -1){
      indexToDelete = arrayTareasFinalizadas.findIndex(y => y.id === idDelete);
      arrayTareasFinalizadas.splice(indexToDelete, 1);
      renderizarTareasFinalizadas();
    };
  };

  function botonBorrarTarea(idTareaDelete) {
    const settingsDelete = {
      method:"DELETE",
      headers: {
      "Content-Type": "application/json",
      "authorization": `${jwtLogin}`
      }
    };
    fetch(`${url}/tasks/${idTareaDelete}`, settingsDelete)
    .then(function(response){
      return response.json();
    }).then(function(data){
      deleteTarea(idTareaDelete);
    }).catch(function(error){
      console.log(error);
    });
  };

  listaTareasFinalizadas.addEventListener("click", function(event){
    if(event.target.tagName === 'BUTTON'){
      let liTareaDelete = event.target.closest(".tarea");
      if(liTareaDelete){
        let textoBoton = event.target.textContent.trim();
        if(textoBoton === "Eliminar tarea"){
          botonBorrarTarea(parseInt(liTareaDelete.id));
        };
      };
    };
  });
});