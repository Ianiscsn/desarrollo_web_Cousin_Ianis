from sqlalchemy import create_engine, text
from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import Mapped, joinedload, relationship
from sqlalchemy import String, Integer, DateTime, ForeignKey, Enum, func

from flask import Flask
from flask import request, render_template, redirect, url_for, flash, make_response, jsonify

import filetype
from werkzeug.utils import secure_filename
import hashlib
import os
import re
from datetime import datetime
from typing import List
import math
from markupsafe import escape



"-----------------------------------------------------"


class Base(DeclarativeBase):
    pass


class Region(Base):
    __tablename__ = 'region'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    nombre: Mapped[str] = mapped_column(String(200), nullable=False)

    comuna : Mapped["Comuna"] = relationship("Comuna", back_populates="region")

class Comuna(Base):
    __tablename__ = 'comuna'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    nombre: Mapped[str] = mapped_column(String(200), nullable=False)
    region_id: Mapped[int] = mapped_column(Integer, ForeignKey('region.id'), nullable=False)

    actividades: Mapped[List["Actividad"]] = relationship("Actividad", back_populates="comuna")
    region : Mapped["Region"] = relationship("Region", back_populates="comuna")


class Actividad(Base):
    __tablename__ = "actividad"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    comuna_id: Mapped[int] = mapped_column(Integer, ForeignKey("comuna.id"), nullable=False)
    sector: Mapped[str] = mapped_column(String(100), nullable=True)
    nombre: Mapped[str] = mapped_column(String(200), nullable=False)
    email: Mapped[str] = mapped_column(String(100), nullable=False)
    celular: Mapped[str] = mapped_column(String(15), nullable=True)
    dia_hora_inicio: Mapped[str] = mapped_column(DateTime, nullable=False)
    dia_hora_termino: Mapped[str] = mapped_column(DateTime, nullable=True)
    descripcion: Mapped[str] = mapped_column(String(500), nullable=True)

    fotos: Mapped[List["Foto"]] = relationship("Foto", back_populates="actividad")
    comuna: Mapped["Comuna"] = relationship("Comuna", back_populates="actividades")
    temas: Mapped[List["ActividadTema"]] = relationship("ActividadTema", back_populates="actividad")
    contact: Mapped[List["ContactarPor"]] = relationship("ContactarPor", back_populates="actividad")
    comentario : Mapped[List["Comentario"]] = relationship("Comentario", back_populates="actividad")



class Foto(Base):
    __tablename__ = 'foto'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    ruta_archivo: Mapped[str] = mapped_column(String(300), nullable=False)
    nombre_archivo: Mapped[str] = mapped_column(String(300), nullable=False)
    actividad_id: Mapped[int] = mapped_column(Integer, ForeignKey('actividad.id'), nullable=False)

    actividad: Mapped["Actividad"] = relationship("Actividad", back_populates="fotos")


class ContactarPor(Base):
    __tablename__ = 'contactar_por'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    nombre: Mapped[str] = mapped_column(Enum('whatsapp', 'telegram', 'X', 'instagram', 'tiktok', 'otra'), nullable=False)
    identificador: Mapped[str] = mapped_column(String(150), nullable=False)
    actividad_id: Mapped[int] = mapped_column(Integer, ForeignKey('actividad.id'), nullable=False)

    actividad: Mapped["Actividad"] = relationship("Actividad", back_populates="contact")


class ActividadTema(Base):
    __tablename__ = 'actividad_tema'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    tema: Mapped[str] = mapped_column(Enum('música', 'deporte', 'ciencias', 'religión', 'política', 'tecnología', 'juegos', 'baile', 'comida', 'otro'), nullable=False)
    glosa_otro: Mapped[str] = mapped_column(String(15), nullable=True)
    actividad_id: Mapped[int] = mapped_column(Integer, ForeignKey('actividad.id'), nullable=False)

    actividad: Mapped["Actividad"] = relationship("Actividad", back_populates="temas")

class Comentario(Base):
    __tablename__ = 'comentario'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    nombre : Mapped[str] = mapped_column(String(80), nullable=False) 
    texto : Mapped[str] = mapped_column(String(300), nullable=False)
    fecha : Mapped[str] = mapped_column(DateTime, nullable=False)
    actividad_id: Mapped[int] = mapped_column(Integer, ForeignKey('actividad.id'), nullable=False)

    actividad: Mapped["Actividad"] = relationship("Actividad", back_populates="comentario")





"-------------------------------------------------------"


app = Flask(__name__)

UPLOAD_FOLDER = 'static/imagen'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = 'Ianis20310_'


"----------------------------------------------------"



@app.route('/', methods=['GET'])
@app.route('/index', methods=['GET'])
def portada():
    mensaje = None
    mensaje = request.args.get('mensaje') 
    if mensaje :
        mensaje = escape(mensaje)
    actividades = None
    session = getSession()
    actividades = session.execute(
        select(Actividad)
        .options(
            joinedload(Actividad.fotos),
            joinedload(Actividad.temas),
            joinedload(Actividad.comuna)
        )
        .order_by(Actividad.id.desc())
        .limit(5)
    ).unique().scalars().all()
    return render_template('index.html', actividades = actividades, mensaje = mensaje)


@app.route('/agregar_actividad', methods=['POST', 'GET'])
def ag_act():
    session = getSession()
    info=[]
    if request.method == 'POST':
            contact_methods = request.form.getlist('contact_method')  
            contact_info = {}
            for method in contact_methods:
                contact_info[method] = request.form.get(f'{method}_id')

            temas = request.form.getlist('temas')
            tem_otra = ""
            for tem in temas:
                if tem == "otra-tema":
                    tem_otra = request.form.get(f'{tem}_id')  

            agrega = (agrega_actividad(session, request.form['región'], request.form['comuna'], request.form['sector'], request.form['nombre'], request.form['email'], request.form['tel'], request.form['date_in'], request.form['date_ter'], request.form['descripción'], request.files.getlist('file[]'), contact_info, temas, tem_otra))
            info = [request.form['región'], request.form['comuna'], request.form['sector'], request.form['nombre'], request.form['email'], request.form['tel'], request.form['date_in'], request.form['date_ter'], request.form['descripción'], request.files.getlist('file[]'), contact_info, temas, tem_otra]
            if agrega == True:
                return redirect (url_for('portada', mensaje="Actividad Agregado"))
            else:
                return render_template('Agregar_actividad.html', mensaje=agrega, info=info)
    return render_template('Agregar_actividad.html', info=info)


@app.route('/estadisticas', methods=['GET'])
def est():
    return render_template('Estadisticas.html')

@app.route('/estat', methods=['GET'])
def estad():
    c = getSession()
    g1 = getGraf1(c)
    graf1=[{"name": 'Actividades',
            "data": g1
            },]
    
    g2 = getGraf2(c)
    graf2=[{"name": "música", "y": g2[0][0]/g2[1]},
        {"name": "deporte", "y": g2[0][1]/g2[1]},
        {"name": "ciencias", "y": g2[0][2]/g2[1]},
        {"name": "religión", "y": g2[0][3]/g2[1]},
        {"name": "política", "y": g2[0][4]/g2[1]},
        {"name": "tecnología", "y": g2[0][5]/g2[1]},
        {"name": "juegos", "y": g2[0][6]/g2[1]},
        {"name": "baile", "y": g2[0][7]/g2[1]},
        {"name": "comida", "y": g2[0][8]/g2[1]},
        {"name": "otro", "y": g2[0][9]/g2[1]}]
    
    g3 = getGraf3(c)
    graf3=[
        {"name": 'Manana',"data": g3[0]},
        {"name": 'Mediodia',"data": g3[1]},
        {"name": 'Tarde', "data": g3[2]}]
    
    infos = [graf1, graf2, graf3]
    resp = make_response(infos)
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp


@app.route('/listados_actividades', methods=['GET'])
def lis_act():
    session = getSession()
    page = int(request.args.get("page", 1))
    per_page = 5
    offset = (page - 1) * per_page

    total_actividades = session.scalar(select(func.count(Actividad.id)))

    actividades = session.execute(
        select(Actividad)
        .options(
            joinedload(Actividad.fotos),
            joinedload(Actividad.temas),
            joinedload(Actividad.comuna)
        )
        .order_by(Actividad.id.desc())
        .offset(offset)
        .limit(per_page)
    ).unique().scalars().all()

    total_pages = math.ceil(total_actividades / per_page)

    return render_template('Listados_actividades.html', actividades=actividades, page=page, total_pages=total_pages)




@app.route('/listados_actividades/informacion', methods=['GET'])
def info():
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
 
    return render_template('información.html', actividad=actividad)

@app.route('/agregar_comentario', methods=['POST'])
def agregar_comentario_ajax():
    session = getSession()
    id = request.args.get("id")
    nombre = request.form.get("nombre_com", "").strip()
    texto = request.form.get("coment", "").strip()

    if not (3 <= len(nombre) <= 80):
        return jsonify({"exito": False, "mensaje": "Nombre debe tener entre 3 y 80 caracteres."})
    if len(texto) < 5:
        return jsonify({"exito": False, "mensaje": "Comentario debe tener al menos 5 caracteres."})

    actividad = session.get(Actividad, id)
    if not actividad:
        return jsonify({"exito": False, "mensaje": "Actividad no encontrada."})

    nuevo_com = Comentario(nombre=nombre, texto=texto, fecha=datetime.now(), actividad=actividad)
    try : 
        session.add(nuevo_com)
        session.commit()

        return jsonify({
            "exito": True,
            "mensaje": "Comentario agregado.",
            "nombre": nombre,
            "texto": texto,
            "fecha": nuevo_com.fecha.strftime("%Y-%m-%d %H:%M")
        })
    except Exception as e:
        app.logger.error("Error con base de datos: {0} ".format(str(e)))
        session.rollback()
    
    

"--------------------------------------------------"

def getSession():
    connection_string = "mysql+pymysql://cc5002:programacionweb@localhost:3306/tarea2"
    engine = create_engine(connection_string, echo=True)
    return Session(engine)


def agrega_actividad(session, region, comuna, sector, nombre, email, tel, date_in, date_ter, descripcion, files, contact, temas, tem_otra):

    validate = validacion( region, comuna, sector, nombre, email, tel, date_in, date_ter, files, contact, temas, tem_otra)
    if validate == True:
        comuna_nom = session.query(Comuna).filter_by(nombre=comuna).first()
        comuna_id=comuna_nom.id
        actividad = Actividad(comuna_id=comuna_id, sector=sector, nombre=nombre, email=email, celular=tel, dia_hora_inicio=date_in, dia_hora_termino=date_ter, descripcion=descripcion)
        
        try:
            session.add(actividad)
            session.commit()
            act_id = actividad.id

            for te in temas : 
                if te == "otra-tema":
                    tema = ActividadTema(tema=te, glosa_otro=tem_otra, actividad_id=act_id)
                else:
                    tema = ActividadTema(tema=te, glosa_otro=None, actividad_id=act_id)
                session.add(tema)
                session.commit()

            for cont in contact : 
                contac = ContactarPor(nombre=cont, identificador=contact[cont], actividad_id=act_id)
                session.add(contac)
                session.commit()

            for file in files:
                filename = secure_filename(file.filename)
                ruta = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                file.save(ruta)
                foto = Foto(ruta_archivo=ruta, nombre_archivo=filename, actividad_id=act_id)
                session.add(foto)
                session.commit()
            return True
        
        except Exception as e:
            app.logger.error("Error con base de datos: {0} ".format(str(e)))
            session.rollback()
    
    else : 
        return validate


def validacion(region, comuna, sector, nombre, email, tel, date_in, date_ter, file, contact, temas, tem_otra):
    msg = ""
    if region == "none" or not region:
        msg += "region invalido\n"
    if comuna == "none" or not comuna:
        msg += "comuna invalido\n"

    if sector and len(sector) > 100:
        msg += "sector invalido\n"

    if not nombre or len(nombre) > 200:
        msg += "nombre invalido\n"

    if not email or len(email) > 100:
        msg += "email invalido\n"
    if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email):
        msg += "email invalido\n"

    if tel and not re.match(r'^\+\d{3}\.\d{8}$', tel):
        msg += "tel invalido\n"

    if len(contact) > 5:
        msg += "contact invalido\n" 
    
    for c in contact:
        if not (4 <= len(contact[c]) <= 50):
            msg += "contact_id invalido\n" 


    try:
        dt_in = datetime.strptime(date_in, "%Y-%m-%dT%H:%M")
    except ValueError:
        msg += "date_in invalido\n" 


    if date_ter:
        try:
            dt_ter = datetime.strptime(date_ter, "%Y-%m-%dT%H:%M")
        except ValueError:
            msg += "date_ter invalido\n" 

        if dt_ter < dt_in:
            msg += "date_ter invalido\n" 

    if len(temas)==0:
        msg += "tema invalido\n" 

    
    if tem_otra:
        if not ( 3 <= len(tem_otra) <= 15):
            msg += "tema_otro invalido\n" 

    if not (1 <= len(file) <= 6):
        msg += "fotos invalido\n" 
    

    if msg == "":
        return True
    else : 
        return msg

def getGraf1(c):
    result = c.execute(select(Actividad.dia_hora_inicio)).scalars().all()
    lista = [0,0,0,0,0,0,0]
    for d in result:
        dia = d.strftime("%A")
        if dia == "Monday":
            lista[0]+=1
        if dia == "Tuesday":
            lista[1]+=1
        if dia == "Wednesday":
            lista[2]+=1
        if dia == "Thursday":
            lista[3]+=1
        if dia == "Friday":
            lista[4]+=1
        if dia == "Saturday":
            lista[5]+=1
        if dia == "Sunday":
            lista[6]+=1
    return lista 

def getGraf2(c):
    result = c.execute(select(ActividadTema.tema)).scalars().all()
    lista = [0,0,0,0,0,0,0,0,0,0]
    for d in result : 
        if d == "música":
            lista[0]+=1
        if d == "deporte":
            lista[1]+=1
        if d == "ciencias":
            lista[2]+=1
        if d == "religión":
            lista[3]+=1
        if d == "política":
            lista[4]+=1
        if d == "tecnología":
            lista[5]+=1
        if d == "juegos":
            lista[6]+=1
        if d == "baile":
            lista[7]+=1
        if d == "comida":
            lista[8]+=1
        if d == "otro":
            lista[9]+=1
    return lista, len(result)

def getGraf3(c):
    result = c.execute(select(Actividad.dia_hora_inicio)).scalars().all()
    ma = [0,0,0,0,0,0,0,0,0,0,0,0]
    md = [0,0,0,0,0,0,0,0,0,0,0,0]
    ta = [0,0,0,0,0,0,0,0,0,0,0,0]

    for d in result :
        if d.hour < 12:
            ma[d.month-1]+=1
        if d.hour >= 12 and d.hour < 18:
            md[d.month-1]+=1
        if d.hour >= 18:
            ta[d.month-1]+=1
    return ma, md, ta


def agregar_comentario(nombre, coment, id, session):
    msg=""
    if not nombre or len(nombre)<3 or len(nombre)>80:
        msg += "nombre invalido\n"
    if not coment or len(coment)<5:
        msg += "comentario invalido\n"

    if msg=="":
        com = Comentario(nombre = nombre, texto=coment, fecha = datetime.now(), actividad_id=id)
        try:
            session.add(com)
            session.commit()
            return True
        
        except Exception as e:
            app.logger.error("Error con base de datos: {0} ".format(str(e)))
            session.rollback()
    else : 
        return msg

"----------------------------------------------------"



if __name__ == "__main__":
    app.run(debug=True)
