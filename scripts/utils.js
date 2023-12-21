/* ---------------------------------- texto --------------------------------- */
function noTieneNumeros(texto){
    const numeros = "0123456789";
    for(i = 0; i < 10; i++){
        if(texto.includes(numeros[i])){
            return false;
        };
    };
    return true;
}

function siTieneLetras(texto){
    const letras = "abcdefghijqklmnñopqrstuvwxyz";
    for(i = 0; i < letras.length; i++){
        if(texto.includes(letras[i])){
            return true;
        };
    };
    return false;
}

function validarTexto(texto){
    if(noTieneNumeros(texto) && siTieneLetras(texto)) return true;
    return false;
}

function normalizarTexto(texto) {
    let temp = texto.trim();
    let temp2 = temp.split(" ");
    let temp3 = "";
    temp2.forEach(palabra => {
        if(palabra !== ""){
            temp3 += " " + palabra;
        }
    });
    return temp3.trim();
}

/* ---------------------------------- email --------------------------------- */
function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
};

function normalizarEmail(email) {
    normalizarTexto(email);
}

/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia) {
    if(noTieneNumeros(constrasenia)){
        alert("La contraseña debe contener al menos un número");
        return false;
    }else if(contrasenia.length >= 8 && noTieneNumeros(contrasenia) === false){
        return true;
    }else if(contrasenia.length < 8){
        alert("La contraseña debe contener al menos 8 caracteres");
        return false;
    }else{
        return false;
    }
}

function compararContrasenias(contrasenia_1, contrasenia_2) {
    if(contrasenia_1 === contrasenia_2) return true;
}

