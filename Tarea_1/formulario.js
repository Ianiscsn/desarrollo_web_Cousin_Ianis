function setCurrentDateTime() {
    let now = new Date();
    let year = now.getFullYear();
    let month = String(now.getMonth() + 1).padStart(2, '0'); 
    let day = String(now.getDate()).padStart(2, '0');
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');

    let hours_fin = String(parseInt(hours) + 3)
    
    let currentDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    let finalDateTime = `${year}-${month}-${day}T${hours_fin}:${minutes}`;

    document.getElementById("date_in").value = currentDateTime;
    document.getElementById("date_ter").value = finalDateTime;

}

window.onload = setCurrentDateTime;



document.getElementById("contact").addEventListener("change", function () {
    let selectedOptions = [...this.selectedOptions];

    if (selectedOptions.length > 0) {
        document.getElementById("id_contact_container").style.display = "block";
    } else {
        document.getElementById("id_contact_container").style.display = "none";
    }
    if (selectedOptions.length > 5) {
        alert("Vous ne pouvez sélectionner que 5 options maximum.");
        selectedOptions[selectedOptions.length - 1].selected = false;
    }
});


document.getElementById("tema").addEventListener("change", function () {
    let select = document.getElementById("tema");
    let selectedOptions = Array.from(select.selectedOptions).map(option => option.value);
    if (selectedOptions.includes("otro")) {
        document.getElementById("id_contact_container2").style.display = "block";
    } else {
        document.getElementById("id_contact_container2").style.display = "none";
    }
});



function anadirFoto() {
    let container = document.getElementById("file-container");
    let fileInputs = container.getElementsByTagName("input");

    if (fileInputs.length < 5) {
        let newInput = document.createElement("input");
        newInput.type = "file";
        newInput.name = "file[]"; 
        container.appendChild(newInput);
    } else {
        alert("Vous ne pouvez ajouter que 5 photos maximum.");
    }
}


const comunasPorRegion = {
    "arica": [
        "Arica",
        "Camarones",
        "Putre",
        "General Lagos"
    ],
    "tarapaca": [
        "Iquique",
        "Alto Hospicio",
        "Pozo Almonte",
        "Camiña",
        "Colchane",
        "Huara",
        "Pica"
    ],
    "antofagasta": [
        "Antofagasta",
        "Mejillones",
        "Sierra Gorda",
        "Taltal",
        "Calama",
        "Ollagüe",
        "San Pedro de Atacama",
        "Tocopilla",
        "María Elena"
    ],
    "atacama": [
        "Copiapó",
        "Caldera",
        "Tierra Amarilla",
        "Chañaral",
        "Diego de Almagro",
        "Vallenar",
        "Alto del Carmen",
        "Freirina",
        "Huasco"
    ],
    "coquimbo": [
        "La Serena",
        "Coquimbo",
        "Andacollo",
        "La Higuera",
        "Paihuano",
        "Vicuña",
        "Illapel",
        "Canela",
        "Los Vilos",
        "Salamanca",
        "Ovalle",
        "Combarbalá",
        "Monte Patria",
        "Punitaqui",
        "Río Hurtado"
    ],
    "valparaíso": [
        "Valparaíso",
        "Casablanca",
        "Concón",
        "Juan Fernández",
        "Puchuncaví",
        "Quintero",
        "Viña del Mar",
        "Isla de Pascua",
        "Los Andes",
        "Calle Larga",
        "Rinconada",
        "San Esteban",
        "La Ligua",
        "Cabildo",
        "Papudo",
        "Petorca",
        "Zapallar",
        "Quillota",
        "La Calera",
        "Hijuelas",
        "La Cruz",
        "Nogales",
        "San Antonio",
        "Algarrobo",
        "Cartagena",
        "El Quisco",
        "El Tabo",
        "Santo Domingo",
        "San Felipe",
        "Catemu",
        "Llaillay",
        "Panquehue",
        "Putaendo",
        "Santa María",
        "Quilpué",
        "Limache",
        "Olmué",
        "Villa Alemana"
    ],
    "santiago": [
        "Cerrillos",
        "Cerro Navia",
        "Conchalí",
        "El Bosque",
        "Estación Central",
        "Huechuraba",
        "Independencia",
        "La Cisterna",
        "La Florida",
        "La Granja",
        "La Pintana",
        "La Reina",
        "Las Condes",
        "Lo Barnechea",
        "Lo Espejo",
        "Lo Prado",
        "Macul",
        "Maipú",
        "Ñuñoa",
        "Pedro Aguirre Cerda",
        "Peñalolén",
        "Providencia",
        "Pudahuel",
        "Quilicura",
        "Quinta Normal",
        "Recoleta",
        "Renca",
        "Santiago",
        "San Joaquín",
        "San Miguel",
        "San Ramón",
        "Vitacura",
        "Puente Alto",
        "Pirque",
        "San José de Maipo",
        "Colina",
        "Lampa",
        "Tiltil",
        "San Bernardo",
        "Buin",
        "Calera de Tango",
        "Paine",
        "Melipilla",
        "Alhué",
        "Curacaví",
        "María Pinto",
        "San Pedro",
        "Talagante",
        "El Monte",
        "Isla de Maipo",
        "Padre Hurtado",
        "Peñaflor"
    ],
    "ohiggins": [
        "Rancagua",
        "Codegua",
        "Coinco",
        "Coltauco",
        "Doñihue",
        "Graneros",
        "Las Cabras",
        "Machalí",
        "Malloa",
        "Mostazal",
        "Olivar",
        "Peumo",
        "Pichidegua",
        "Quinta de Tilcoco",
        "Rengo",
        "Requínoa",
        "San Vicente",
        "Pichilemu",
        "La Estrella",
        "Litueche",
        "Marchihue",
        "Navidad",
        "Paredones",
        "San Fernando",
        "Chépica",
        "Chimbarongo",
        "Lolol",
        "Nancagua",
        "Palmilla",
        "Peralillo",
        "Placilla",
        "Pumanque",
        "Santa Cruz"
    ],
    "maule": [
        "Talca",
        "Constitución",
        "Curepto",
        "Empedrado",
        "Maule",
        "Pelarco",
        "Pencahue",
        "Río Claro",
        "San Clemente",
        "San Rafael",
        "Cauquenes",
        "Chanco",
        "Pelluhue",
        "Curicó",
        "Hualañé",
        "Licantén",
        "Molina",
        "Rauco",
        "Romeral",
        "Sagrada Familia",
        "Teno",
        "Vichuquén",
        "Linares",
        "Colbún",
        "Longaví",
        "Parral",
        "Retiro",
        "San Javier",
        "Villa Alegre",
        "Yerbas Buenas"
    ],
    "ñuble": [
        "Chillán",
        "Bulnes",
        "Cobquecura",
        "Coelemu",
        "Coihueco",
        "El Carmen",
        "Ninhue",
        "Ñiquén",
        "Pemuco",
        "Pinto",
        "Portezuelo",
        "Quillón",
        "Quirihue",
        "Ránquil",
        "San Carlos",
        "San Fabián",
        "San Ignacio",
        "San Nicolás",
        "Treguaco",
        "Yungay"
    ],
    "biobío": [
        "Concepción",
        "Coronel",
        "Chiguayante",
        "Florida",
        "Hualpén",
        "Hualqui",
        "Lota"
    ],

    "araucanía": [
            "Temuco",
            "Padre Las Casas",
            "Angol",
            "Villarrica",
            "Nueva Imperial",
            "Victoria",
            "Lautaro",
            "Carahue",
            "Freire",
            "Loncoche",
            "Vilcún",
            "Collipulli",
            "Pitrufquén",
            "Pucón",
            "Traiguén",
            "Cunco",
            "Curacautín",
            "Teodoro Schmidt",
            "Gorbea",
            "Saavedra",
            "Purén",
            "Galvarino",
            "Lumaco",
            "Toltén",
            "Lonquimay",
            "Cholchol",
            "Renaico",
            "Ercilla",
            "Los Sauces",
            "Curarrehue"
    ],
    "losríos": [
            "Valdivia",
            "Corral",
            "Lanco",
            "Los Lagos",
            "Máfil",
            "Mariquina",
            "Paillaco",
            "Panguipulli",
            "La Unión",
            "Futrono",
            "Lago Ranco",
            "Río Bueno"
    ],
    "loslagos": [
            "Puerto Montt",
            "Calbuco",
            "Cochamó",
            "Fresia",
            "Frutillar",
            "Los Muermos",
            "Llanquihue",
            "Maullín",
            "Puerto Varas",
            "Castro",
            "Ancud",
            "Chonchi",
            "Curaco de Vélez",
            "Dalcahue",
            "Puqueldón",
            "Queilén",
            "Quellón",
            "Quemchi",
            "Quinchao",
            "Osorno",
            "Puerto Octay",
            "Purranque",
            "Puyehue",
            "Río Negro",
            "San Juan de la Costa",
            "San Pablo",
            "Chaitén",
            "Futaleufú",
            "Hualaihué",
            "Palena"
    ],
    "aysen": [
            "Coyhaique",
            "Aysén",
            "Cisnes",
            "Guaitecas",
            "Río Ibáñez",
            "Chile Chico",
            "Cochrane",
            "O'Higgins",
            "Tortel",
            "Lago Verde"
    ],
    "magallanes": [
            "Punta Arenas",
            "Laguna Blanca",
            "Río Verde",
            "San Gregorio",
            "Cabo de Hornos",
            "Antártica",
            "Porvenir",
            "Primavera",
            "Timaukel",
            "Natales",
            "Torres del Paine"
    ]    
} ;


function modificarComunas() {
    let regionSelect = document.getElementById("región");
    let comunaSelect = document.getElementById("comuna");

    comunaSelect.innerHTML = '<option value="none">Seleccione una comuna</option>';

    let selectedRegion = regionSelect.value;
    if (selectedRegion!=="none" && comunasPorRegion[selectedRegion]) {
        comunasPorRegion[selectedRegion].forEach(comuna => {
            let option = document.createElement("option");
            option.value = comuna.toLowerCase().replace(/ /g, "_");
            option.textContent = comuna;
            comunaSelect.appendChild(option);
        });
    }
}



function confirmación(event) {
    event.preventDefault(); 
    const validadorRegion = (region) => region !== "none";
    const validadorComuna = (comuna) => comuna !== "none";
    const validadorSector = (sector) => !(sector && sector.length > 100);
    const validadorNombre = (nombre) => nombre && nombre.length < 201;

    const validadorMail = (mail) => {
        if (!mail) return false; 
        if (mail.length > 100) return false;
        if (mail.split("@").length - 1 !== 1) return false;

        let prohibido = /[/, #, :, +, *]/;
        if (prohibido.test(mail)) return false;

        let index1 = mail.indexOf("@");
        let index2 = mail.lastIndexOf(".");

        return (index1 > 0 && index1 < mail.length - 4 && index2 > index1 + 2 && index2 < mail.length - 2);
    }

    const validadorTel = (tel) => {
        let lista = ["0","1","2","3","4","5","6","7","8","9"];
        if (tel){
            if (tel.length !== 15) return false;

            if (tel[0] !== "+" || tel[4] !== ".") return false ;
            
            for (i=1; i<4; i++){
                if (!lista.includes(tel[i])) return false;
            }

            for (i=5; i<tel.length ; i++){
                if (!lista.includes(tel[i])) return false;
            }
        } 
        return true ;
    }

    const validadorContact = (contact, id_contact) => {
        let selectedOptions = [...contact.selectedOptions];

        let valid = true;
        if (selectedOptions.length > 0){
            if (id_contact.length >50 || id_contact.length < 4){
                valid = false;
            }
        }
        return (valid && selectedOptions.length < 6);
    }

    const validadorDateIn = (date_in) => {
        let date = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/; 
        if (date_in) {
            if (date.test(date_in)){
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

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
}


function validacion() {
    document.getElementById("modalConfirm").style.display = "none";
    document.getElementById("Confirm").style.display = "flex";
}

function nada() {
    document.getElementById("modalConfirm").style.display = "none";
    document.getElementById("content").style.opacity=1;
}



