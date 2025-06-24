window.onload = function () {
    const form = document.getElementById('comentarioForm');
    if (!form) {
        console.error("Le formulaire avec id 'comentarioForm' est introuvable.");
        return;
    }    
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const nombre = document.getElementById('nombre_com').value.trim();
        const coment = document.getElementById('coment').value.trim();
        const idActividad = document.getElementById('id_actividad').value;

        if (nombre.length < 3 || nombre.length > 80 || coment.length < 5) {
            document.getElementById('mensaje').textContent = "Informaciones invalidas";
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState==4 & xhr.status === 200) {
                const respuesta = JSON.parse(xhr.responseText);
                document.getElementById('mensaje').textContent = respuesta.mensaje;

                if (respuesta.exito) {
                    const div = document.createElement('div');
                    div.innerHTML = `<i>${respuesta.nombre} comentó el ${respuesta.fecha}</i>: <b>${respuesta.texto}</b><br>`;
                    document.getElementById('comentarios').appendChild(div);
                    form.reset();
                }
            }
        };

        xhr.open("POST", `/comentarios/agregar?id=${idActividad}`, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        const datos = `nombre_com=${encodeURIComponent(nombre)}&coment=${encodeURIComponent(coment)}`;
        xhr.send(datos);
    });
};
