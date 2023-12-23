import {validarTexto, normalizarTexto, validarEmail, validarContrasenia, compararContrasenias} from "./utils.js";

window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */
    const url = "https://todo-api.ctd.academy/v1";
    const form = document.forms[0];
    const inputFirstName = document.getElementById("inputNombre");
    const inputLastName = document.getElementById("inputApellido");
    const inputEmail = document.getElementById("inputEmail");
    const inputPassword = document.getElementById("inputPassword");
    const inputPasswordRepetida = document.getElementById("inputPasswordRepetida");

    

    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const normalizedName = normalizarTexto(inputFirstName.value);
        const normalizedSurname = normalizarTexto(inputLastName.value);
        const normalizedEmail = normalizarTexto(inputEmail.value);

        const payload = {
            firstName: normalizedName,
            lastName: normalizedSurname,
            email: normalizedEmail,
            password: inputPassword.value
        };

        const settings = {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }

        if(validarEmail(normalizedEmail) && validarContrasenia(inputPassword.value)
        && validarTexto(normalizedName) && validarTexto(normalizedSurname)
        && compararContrasenias(inputPassword.value, inputPasswordRepetida.value)){
            realizarRegister(settings);
        };
        if(validarEmail(normalizedEmail) === false){
            alert("El contenido del campo de email es incorrecto.");
        };
        if(validarContrasenia(inputPassword.value) === false){
            alert("La contraseña debe contener 8 caracteres o más, y al menos un número.");
        };
        if(validarTexto(normalizedName) === false){
            alert("El campo de nombre sólo puede contener letras.");
        };
        if(validarTexto(normalizedSurname) === false){
            alert("El campo de apellido sólo puede contener letras.");
        };
        if(compararContrasenias(inputPassword.value, inputPasswordRepetida.value) === false){
            alert("Las contraseñas no coinciden.");
        };
        
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