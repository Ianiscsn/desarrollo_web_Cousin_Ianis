<table class="table">
            <tbody>
                <tr>
                    <th>Inicio</th>
                    <th>Término</th>
                    <th>Comuna</th>
                    <th>Sector</th>
                    <th>Tema</th>
                    <th>Foto</th>
                </tr>
                <tr>
                    <td>2025-03-30 <br>12:00</td>
                    <td>2025-03-30 <br>14:00</td>
                    <td>Providencia</td>
                    <td>Barrio Italia</td>
                    <td>Classe de pintura</td>
                    <td><img src="{{ url_for('static', filename='imagen/Pintura.jpg') }}" alt=""></td>
                    
                </tr>
                <tr>
                    <td>2025-03-31 <br>18:00</td>
                    <td>2025-03-31 <br>19:00</td>
                    <td>Santiago Centro</td>
                    <td>Barrio Bellas Artes</td>
                    <td>Museo de la prehistoria</td>
                    <td><img src="Museo.jpg" alt=""></td>
                </tr>
                <tr>
                    <td>2025-03-31 <br>20:00</td>
                    <td>2025-03-31 <br>21:30</td>
                    <td>Ñuñoa</td>
                    <td>Villa Frei</td>
                    <td>Concierto de jazz</td>
                    <td><img src="Concierto.jpg" alt=""></td>                    
                </tr>
                <tr>
                    <td>2025-04-01 <br>9:30</td>
                    <td>2025-04-01 <br>11:00</td>
                    <td>Providencia</td>
                    <td>Manuel Montt</td>
                    <td>Clase de pádel</td>
                    <td><img src="Padel.jpg" alt=""></td>                    
                </tr>
                <tr>
                    <td>2025-04-01 <br>17:00</td>
                    <td>2025-04-01 <br>18:30</td>
                    <td>Las Condes</td>
                    <td>El Golf</td>
                    <td> Introduccion a la gestion</td>
                    <td><img src="Gestion.jpg" alt=""></td>                    
                </tr>
            </tbody>
        </table>




------------------------------------------


<div class="trans-input-select">
                    <label> Contact </label>
                    <div class="select-border">
                        <div class="select-comp">
                            <input type="checkbox" name="whatsapp" onchange="updateLabel(this)"> Whatsapp
                            <input type="text" id="whatsapp" style="display: none;" placeholder="ID" class="select-input" minlength="4" maxlength="50">
                        </div>

                        <div class="select-comp">
                            <input type="checkbox" name="telegram" onchange="updateLabel(this)"> Telegram
                            <input type="text" id="telegram" style="display: none;" placeholder="ID" class="select-input" minlength="4" maxlength="50">
                        </div>

                        <div class="select-comp">
                            <input type="checkbox" name="x" onchange="updateLabel(this)"> X
                            <input type="text" id="x" style="display: none;" placeholder="ID" class="select-input" minlength="4" maxlength="50">
                        </div>

                        <div class="select-comp">
                            <input type="checkbox" name="instagram" onchange="updateLabel(this)"> Instagram
                            <input type="text" id="instagram" style="display: none;" placeholder="ID" class="select-input" minlength="4" maxlength="50">
                        </div>

                        <div class="select-comp">
                            <input type="checkbox" name="tiktok" onchange="updateLabel(this)"> TikTok
                            <input type="text" id="tiktok" style="display: none;" placeholder="ID" class="select-input" minlength="4" maxlength="50">
                        </div>

                        <div class="select-comp">
                            <input type="checkbox" name="otra" onchange="updateLabel(this)"> Otra
                            <input type="text" id="otra" style="display: none;" placeholder="ID" class="select-input" minlength="4" maxlength="50">
                        </div>
                    </div>
                </div>




---------------------------------------------------
listes activités




<a href="información.html">
            <table class="table">
                <tbody>
                    <tr>
                        <th>Inicio</th>
                        <th>Término</th>
                        <th>Comuna</th>
                        <th>Sector</th>
                        <th>Tema</th>
                        <th> Nombre Organizador</th>
                        <th>Total Fotos</th>
                    </tr>
                    <tr>
                        <td>2025-03-30 <br>12:00</td>
                        <td>2025-03-30 <br>14:00</td>
                        <td>Providencia</td>
                        <td>Barrio Italia</td>
                        <td>Classe de pintura</td>
                        <td>Juan Valdés Fuentes</td>
                        <td><img src="Pintura.jpg" alt=""></td>
                    </tr>
                    <tr>
                        <td>2025-03-31 <br>18:00</td>
                        <td>2025-03-31 <br>19:00</td>
                        <td>Santiago Centro</td>
                        <td>Barrio Bellas Artes</td>
                        <td>Museo de la Antigüedad</td>
                        <td>María Rojas Torres</td>
                        <td><img src="Museo.jpg" alt=""></td>
                    </tr>
                    <tr>
                        <td>2025-03-31 <br>20:00</td>
                        <td>2025-03-31 <br>21:30</td>
                        <td>Ñuñoa</td>
                        <td>Villa Frei</td>
                        <td>Concierto de jazz</td>
                        <td>Francisco Castillo Araya</td>
                        <td><img src="Concierto.jpg" alt=""></td>                    
                    </tr>
                    <tr>
                        <td>2025-04-01 <br>9:30</td>
                        <td>2025-04-01 <br>11:00</td>
                        <td>Providencia</td>
                        <td>Manuel Montt</td>
                        <td>Clase de pádel</td>
                        <td>Carlos Sánchez Muñoz</td>
                        <td><img src="Padel.jpg" alt=""></td>                    
                    </tr>
                    <tr>
                        <td>2025-04-01 <br>17:00</td>
                        <td>2025-04-01 <br>18:30</td>
                        <td>Las Condes</td>
                        <td>El Golf</td>
                        <td> Introduccion a la gestion</td>
                        <td>Camila  Gómez Pérez</td>
                        <td><img src="Gestion.jpg" alt=""></td>                    
                    </tr>
                </tbody>
            </table>
        </a>






----------------------------------------
information 

<div class="content">
        <h1> Museo de la Antigüedad </h1>

        <div class="descri">
            <b>Partie I : ¿Dónde?</b> <br>
            <div class="text">
                <b>Región :</b> Región Metropolitana de Santiago<br>
                <b>Comuna :</b> Santiago Centro<br>
                <b>Sector :</b> Barrio Bellas Artes<br>
            </div>
            
            <b>Partie II : ¿Quién organiza?</b>
            <div class="text">
                <b>Nombre :</b> María Rojas Torres<br>
                <b>Email :</b> maría.rojas@gmail.com<br>
                <b>Número de celular :</b> +569.15240890<br>
                <b>Contactar por :</b> Instagram (@maría_rojas)<br>
            </div>

            <b>Partie III : ¿Cuándo y de qué trata?</b>
            <div class="text">
                <b>Día hora inicio :</b> 2025-03-31 / 18:00  <br>
                <b>Día hora término :</b> 2025-03-31 / 19:00<br>
                <b>Descripción :</b> Si quiere desarrollar su cultura histórica, ha llegado al lugar adecuado. Acompáñanos en una visita al Museo de la Antigüedad y aprende todo sobre el tema. Saldrás sabiéndolo todo sobre las deidades griegas y romanas, los imperios romanos y sus conquistas, la batalla de Troya y mucho más. ¡Le esperamos el 31/03/2025!<br>
                <b>Tema :</b> Museo de la Antigüedad <br>
            </div>

            <b>Partie IV : Fotos</b> <br>
            <button class="boton" onclick="ampliar(1)">
                <img src="Museo.jpg" alt="" class="foto" id="image1">
            </button>

            <button class="boton" onclick="ampliar(2)">
                <img src="Estatua.jpg" alt="" class="foto">
            </button>
                
            <div class="overlay" id="popup1">
                <div class="popup">
                    <button class="close-btn" onclick="fermer(1)">X</button>
                    <img src="Museo.jpg" alt="Musée">
                </div>
            </div>

            <div class="overlay" id="popup2">
                <div class="popup">
                    <button class="close-btn" onclick="fermer(2)">X</button>
                    <img src="Estatua.jpg" alt="Estatua">
                </div>
            </div>
        </div>

        <div class="final">
            <a href="Listados_actividades.html" class="contact">
                <p> Listado de actividades  </p>
            </a>

            <a href="index.html" class="contact">
                <p> Pagina principal </p>
            </a>
        </div>
    </div>





    -----------------------------------------
    comunas 


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





-------------------------------
confirmation


<div id="modalConfirm" class="modal">
        <div class="modal-content">
            <p><b>¿Está seguro que desea agregar esta actividad?</b></p>
            <button id="btnSi">Sí</button>
            <button id="btnNo">No</button>
        </div>
    </div>

    <div id="Confirm" class="confirm">
        <div class="confirm-content">
            <p><b>Hemos recibido su información, muchas gracias y suerte en su actividad !</b></p>
            <a href="index.html" class="contact">
                <p> Pagina principal </p>
            </a>                
        </div>
    </div>