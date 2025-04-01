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
};

function updateTema(element){
    if (element.checked){
        document.getElementById(element.name).style.display = "block";
    } else {
        document.getElementById(element.name).style.display = "none";
    }
};

function updateLabel(element){
    if (element.checked){
        document.getElementById(element.name).style.display = "block";
    } else {
        document.getElementById(element.name).style.display = "none";
    }
};

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
};

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
    "valparaiso": [
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
};

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
};

function validacion() {
    document.getElementById("modalConfirm").style.display = "none";
    document.getElementById("Confirm").style.display = "flex";
};

function nada() {
    document.getElementById("modalConfirm").style.display = "none";
    document.getElementById("content").style.opacity=1;
};


window.onload = setCurrentDateTime;
//document.getElementById("tema").addEventListener("change", updateTema);
document.getElementById("add-photo").addEventListener("click", anadirFoto);
document.getElementById("región").addEventListener("change", modificarComunas);
document.getElementById("btnSi").addEventListener("click", validacion);
document.getElementById("btnNo").addEventListener("click", nada);







