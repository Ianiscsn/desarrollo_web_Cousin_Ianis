const validadorRegion = (region) => region !== "none";

const validadorComuna = (comuna) => comuna !== "none";

const validadorSector = (sector) => !(sector && sector.length > 100);

const validadorNombre = (nombre) => nombre && nombre.length < 201;

const validadorMail = (mail) => {
    if (!mail) return false; 
    if (mail.length > 100) return false;

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(mail);
};

const validadorTel = (tel) => {
    const regex = /^\+\d{3}\.\d{8}$/;
    if (tel){
        return regex.test(tel);
    }
    return true;
};

const validadorContact = (contact, id_contact) => {
    let selectedOptions = [...contact.selectedOptions];
    let selectedOptions1 = Array.from(contact.selectedOptions).map(option => option.value);
    let valid = true;
    if (selectedOptions1.includes("ninguno")) return true;
    if (selectedOptions.length > 0){
        if (id_contact.length >50 || id_contact.length < 4){
            valid = false;
        }
    };
    return (valid && selectedOptions.length < 6);
};

const validadorDateIn = (date_in) => {
    let date = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/; 
    return date.test(date_in);
};

const validadorDateTe = (dates_ter, dates_in) => {
    let date = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/; 
    let validador = true

    if (dates_ter){
        let [date_ter, horas_ter] = dates_ter.split("T"); 
        let [ano_ter, mes_ter, dia_ter] = date_ter.split("-"); 
        let [hora_ter, min_ter] = horas_ter.split(":");

        let [date_in, horas_in] = dates_in.split("T"); 
        let [ano_in, mes_in, dia_in] = date_in.split("-"); 
        let [hora_in, min_in] = horas_in.split(":");

        if (!date.test(dates_ter)){
            validador = false;
        }
        if (ano_in > ano_ter){
            validador = false;
        }
        if (ano_in == ano_ter && mes_in>mes_ter){
            validador = false;
        }
        if (ano_in==ano_ter && mes_in==mes_ter && dia_in>dia_ter){
            validador = false;
        }
        if (ano_in==ano_ter && mes_in==mes_ter && dia_in==dia_ter && hora_in>hora_ter){
            validador = false;
        }
        if (ano_in==ano_ter && mes_in==mes_ter && dia_in==dia_ter && hora_in==hora_ter && min_in>min_ter){
            validador = false;
        }
    } 
    return validador;
}

const validadorTema = (tema, desc_tema) => {
    let selectedOptions = Array.from(tema.selectedOptions).map(option => option.value);
    let valid = true ; 
    if (selectedOptions.includes("otro")){
        if (desc_tema.length < 3 || desc_tema.length > 15){
            valid = false;
        }
    }
    return (valid && selectedOptions.length>0);
}

const validadorFoto = (file) => {
    return file.files.length > 0 && file.files.length < 6;
}

function confirmación(event) {
    event.preventDefault(); 
    
    let region = document.getElementById("región");
    let comuna = document.getElementById("comuna");
    let sector = document.getElementById("sector");

    let nombre = document.getElementById("nombre");
    let email = document.getElementById("email");
    let tele = document.getElementById("tel");
    let contact = document.getElementById("contact");
    let id_contact = document.getElementById("id_contact");

    let date_in = document.getElementById("date_in");
    let date_ter = document.getElementById("date_ter");
    let tema = document.getElementById("tema");
    let desc_tema = document.getElementById("desc_tema");
    let file = document.getElementById("file");

    msg="";

    if (!validadorRegion(region.value)){
        msg += "region invalido\n";
    }
    if (!validadorComuna(comuna.value)){
        msg += "comuna invalido\n";
    }
    if (!validadorSector(sector.value)){
        msg += "sector invalido\n";
    }
    if (!validadorNombre(nombre.value)){
        msg += "nombre invalido\n";
    }
    if (!validadorMail(email.value)){
        msg += "email invalido\n";
    }
    if (!validadorTel(tele.value)){
        msg += "tele invalido\n";
    }
    if (!validadorContact(contact, id_contact.value)){
        msg += "contact invalido\n";
    }
    if (!validadorDateIn(date_in.value)){
        msg += "dato_in invalido\n";
    }
    if (!validadorDateTe(date_ter.value, date_in.value)){
        msg += "date_ter invalido\n";
    }
    if (!validadorTema(tema, desc_tema.value)){
        msg += "tema invalido\n";
    }
    if (!validadorFoto(file)){
        msg += "fotos invalido\n";
    }

    if (msg !== ""){
        alert(msg);
        return false;
    }
    document.getElementById("content").style.opacity="0.1";
    document.getElementById("modalConfirm").style.display = "flex";
};

document.getElementById("agreg_actividad").addEventListener("click", confirmación);
