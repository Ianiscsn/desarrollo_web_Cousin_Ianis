let actividad_id = null

function open_notas(id) {
    actividad_id = id;
    document.getElementById("notas").style.display = "block";
    document.getElementById("content-real").style.opacity = 0.1;
}

function close_notas(){
    actividad_id = null;
    document.getElementById("notas").style.display = "none";
    document.getElementById("content-real").style.opacity = 1;
}

function agr_nota(){
    let nota = document.getElementById("nota").value;
    if (!(nota > 7 || nota < 1)) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/actividades/agregar_nota", true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            document.getElementById("nota_" + actividad_id).textContent = response.premedio;
            close_notas();
            }
        };

        const data = {
            id: actividad_id,
            nota: nota
        };

        xhr.send(JSON.stringify(data));
    }
}