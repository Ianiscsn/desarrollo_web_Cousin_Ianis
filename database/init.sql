-- Active: 1745262284765@@127.0.0.1@3306@tarea2
SET NAMES utf8;
SET CHARACTER SET utf8;

INSERT INTO actividad (id, comuna_id, sector, nombre, email, celular, dia_hora_inicio, dia_hora_termino, descripcion) VALUES (1, 130207,'Barrio Italia', 'Juan Valdes Fuentes', 'juan.fuentes@gmail.com', '+123.45678912', '2025-04-25 12:00:00', '2025-04-25 14:00:00', 'Te espero en la clase de pintura.' );
INSERT INTO actividad_tema (id, tema, glosa_otro, actividad_id) VALUES (1,'otro', 'Pintura', 1);
INSERT INTO contactar_por (id, nombre, identificador , actividad_id) VALUES (1,'instagram', 'juan_f', 1);
INSERT INTO foto (id, ruta_archivo, nombre_archivo, actividad_id) VALUES (1,"static/imagen/Pintura.jpg", "Pintura.jpg", 1);


INSERT INTO actividad (id, comuna_id, sector, nombre, email, celular, dia_hora_inicio, dia_hora_termino, descripcion) VALUES (2, 130208,'Barrio Bellas Artes ', 'Maria Rojas Torres', 'maria.tor@gmail.com', '+123.45678912', '2025-04-28 18:00:00', '2025-04-28 19:00:00', 'Te espero en el museo de la Antiguedad.' );
INSERT INTO actividad_tema (id, tema, glosa_otro, actividad_id) VALUES (2,'otro', 'Museo', 2);
INSERT INTO contactar_por (id, nombre, identificador , actividad_id) VALUES (2,'X', '@maria_tor', 2);
INSERT INTO foto (id, ruta_archivo, nombre_archivo, actividad_id) VALUES (2,"static/imagen/Estatua.jpg", "Estatua.jpg", 2);
INSERT INTO foto (id, ruta_archivo, nombre_archivo, actividad_id) VALUES (3,"static/imagen/Museo.jpg", "Museo.jpg", 2);


INSERT INTO actividad (id, comuna_id, sector, nombre, email, celular, dia_hora_inicio, dia_hora_termino, descripcion) VALUES (3, 130210,'Villa Frei', 'Fransisco Castillo Araya', 'fran@gmail.cl', '+123.45678912', '2025-05-02 20:00:00', '2025-05-02 21:30:00', 'Te espero en el concierto de jazz.' );
INSERT INTO actividad_tema (id, tema, glosa_otro, actividad_id) VALUES (3,'música', NULL, 3);
INSERT INTO foto (id, ruta_archivo, nombre_archivo, actividad_id) VALUES (4,"static/imagen/Concierto.jpg", "Concierto.jpg", 3);


INSERT INTO actividad (id, comuna_id, sector, nombre, email, celular, dia_hora_inicio, dia_hora_termino, descripcion) VALUES (4, 130207,'Manuel Montt', 'Carlos Sanchez Munoz', 'carlos.mun@uchile.cl', '+123.45678912', '2025-05-04 09:30:00', '2025-05-04 11:00:00', 'Te espero en la clase de padel.' );
INSERT INTO actividad_tema (id, tema, glosa_otro, actividad_id) VALUES (4,'deporte', NULL, 4);
INSERT INTO contactar_por (id, nombre, identificador , actividad_id) VALUES (3,'whatsapp', '+123.45678912', 4);
INSERT INTO foto (id, ruta_archivo, nombre_archivo, actividad_id) VALUES (5,"static/imagen/Padel.jpg", "Padel.jpg", 4);


INSERT INTO actividad (id, comuna_id, sector, nombre, email, celular, dia_hora_inicio, dia_hora_termino, descripcion) VALUES (5, 130210,'EL Golf', 'Camila Gomez Perez', 'cam.go@gmail.com', '+123.45678912', '2025-05-10 17:00:00', '2025-05-10 18:30:00', 'Te espero en la clase de gestion.' );
INSERT INTO actividad_tema (id, tema, glosa_otro, actividad_id) VALUES (5,'otro', 'Gestion', 5);
INSERT INTO contactar_por (id, nombre, identificador , actividad_id) VALUES (4,'telegram', 'cam_go', 5);
INSERT INTO foto (id, ruta_archivo, nombre_archivo, actividad_id) VALUES (6,"static/imagen/Gestion.jpg", "Gestion.jpg", 5);


INSERT INTO actividad (id, comuna_id, sector, nombre, email, celular, dia_hora_inicio, dia_hora_termino, descripcion) VALUES (6, 50508, NULL, 'Lea Normand', 'lea19@gmail.com', '+123.45678912', '2025-05-20 16:00:00', '2025-05-20 18:00:00', 'Te espero en la clase de baile' );
INSERT INTO actividad_tema (id, tema, glosa_otro, actividad_id) VALUES (6,'baile', NULL, 6);
INSERT INTO contactar_por (id, nombre, identificador , actividad_id) VALUES (5,'instagram', '@lea_nor', 6);
INSERT INTO foto (id, ruta_archivo, nombre_archivo, actividad_id) VALUES (7,"static/imagen/ballroom-1039371_1280.jpg", "ballroom-1039371_1280.jpg", 6);




INSERT INTO comentario(id, nombre, texto, fecha, actividad_id) VALUES (1, "Ianis", "Voy a venir", "2025-05-25 14:12:00",6);
INSERT INTO comentario(id, nombre, texto, fecha, actividad_id) VALUES (2, "Lea", "Estoy herido", "2025-06-01 08:27:00",6);
INSERT INTO comentario(id, nombre, texto, fecha, actividad_id) VALUES (3, "Karine", "Recomiendo este curso a todo el mundo", "2025-06-12 21:01:00",6);
INSERT INTO comentario(id, nombre, texto, fecha, actividad_id) VALUES (4, "Alexis", "Finalmente lo crearon", "2025-06-03 16:17:00",4);
INSERT INTO comentario(id, nombre, texto, fecha, actividad_id) VALUES (5, "Camille", "Mi grupo favorito", "2025-05-26 10:42:00",3);
INSERT INTO comentario(id, nombre, texto, fecha, actividad_id) VALUES (6, "Evelyne", "No aprendemos lo suficiente", "2025-05-25 20:10:00",1);
INSERT INTO comentario(id, nombre, texto, fecha, actividad_id) VALUES (7, "Max", "Buen descubrimiento", "2025-05-28 13:52:00",1);

INSERT INTO nota(id, actividad_id, nota) VALUES (1, 1, 4);
INSERT INTO nota(id, actividad_id, nota) VALUES (2, 1, 7);
INSERT INTO nota(id, actividad_id, nota) VALUES (3, 2, 3);
INSERT INTO nota(id, actividad_id, nota) VALUES (4, 3, 1);
INSERT INTO nota(id, actividad_id, nota) VALUES (5, 3, 3);
INSERT INTO nota(id, actividad_id, nota) VALUES (6, 3, 7);