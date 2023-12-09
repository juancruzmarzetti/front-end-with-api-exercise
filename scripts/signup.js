window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const url = "https://todo-api.ctd.academy/v1";
    const form = document.forms[0];
    const inputFirstName = document.getElementById("inputNombre");
    const inputLastName = document.getElementById("inputApellido");
    const inputEmail = document.getElementById("inputEmail");
    const inputPassword = document.getElementById("inputPassword");

    

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const payload = {
            firstName: inputFirstName.value,
            lastName: inputLastName.value,
            email: inputEmail.value,
            password: inputPassword.value
        };

        const settings = {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }
        
        realizarRegister(settings);
    });

    /* -------------------------------------------------------------------------- */
    /*                    FUNCIÓN 2: Realizar el signup [POST]                    */
    /* -------------------------------------------------------------------------- */
    function realizarRegister(settings) {
        fetch(`${url}/users`, settings)
        .then(function(response){
            return response.json();
        }).then(function(data){
            if(data.jwt){
                localStorage.setItem("jwt-signup", data.jwt);
                location.replace("./index.html");
            }
        }).catch(function(error){
            console.log(error);
        });
    };
});