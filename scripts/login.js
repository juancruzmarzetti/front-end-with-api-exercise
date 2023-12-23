window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const url = "https://todo-api.ctd.academy/v1";
    const form = document.forms[0];
    const inputEmail = document.getElementById("inputEmail");
    const inputPassword = document.getElementById("inputPassword");
    let jwtLogin = localStorage.getItem("jwt-login");
    let jwtSignUp = localStorage.getItem("jwt-signup");
    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const payload = {
            email: inputEmail.value,
            password: inputPassword.value
        }

        const settings = {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }
        realizarLogin(settings);
    });


    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarLogin(settings){
        fetch(`${url}/users/login`, settings)
        .then(function(response){
            return response.json();
        }).then(function(data){
            if(data.jwt){
                localStorage.setItem("jwt-login", data.jwt);
                location.replace("./mis-tareas.html");
            }
        }).catch(function(error){
            console.log("Error: " + error);
            alert("Email o contraseña incorrectos");
        });
    };
});