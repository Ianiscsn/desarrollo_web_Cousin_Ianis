function check_info(){
    let nombre = document.getElementById("nombre_com");
    let coment = document.getElementById("coment");

    msg = "";

    if (!nombre || nombre.length < 3 || nombre.length > 80){
        msg += "nombre invalido\n";
    }

    if (!coment || coment.length < 5 ){
        msg += "comentario invalido\n";
    }

    if (msg !== ""){
        alert(msg);
        return false;
    }



}