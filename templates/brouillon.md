        <form class="transport-form" action="{{ url_for('info') }}?id={{ actividad.id }}" method="post" enctype=multipart/form-data>



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





@app.route('/listados_actividades/informacion', methods=['POST', 'GET'])
def info():
    info = []
    id = request.args.get("id")
    session = getSession()
    actividad = session.execute(
        select(Actividad)
        .options(
            joinedload(Actividad.fotos),
            joinedload(Actividad.temas),
            joinedload(Actividad.contact),
            joinedload(Actividad.comuna).joinedload(Comuna.region),
            joinedload(Actividad.comentario),
        )
        .where(Actividad.id == id)
    ).unique() .scalar_one_or_none() 

    if request.method == 'POST':
        agrega = agregar_comentario(request.form['nombre_com'],request.form['coment'], id, session)
        info = [request.form['nombre_com'],request.form['coment']]
        if agrega != True: 
            return render_template('información.html', actividad=actividad, info = info, mensaje = agrega)
        else :
            return render_template('información.html', actividad=actividad, info = [], mensaje = 'Comentario agregado')
 
    return render_template('información.html', actividad=actividad, info = info, mensaje="")