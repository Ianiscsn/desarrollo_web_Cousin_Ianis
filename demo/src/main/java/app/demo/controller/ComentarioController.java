package app.demo.controller;

import app.demo.model.Actividad;
import app.demo.model.Comentario;
import app.demo.service.ActividadService;
import app.demo.service.ComentarioService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/comentarios")
public class ComentarioController {

    @Autowired
    private ActividadService actividadService;

    @Autowired
    private ComentarioService comentarioService;

    @PostMapping("/agregar")
    public ResponseEntity<Map<String, Object>> agregarComentario(
            @RequestParam("id") Integer actividadId,
            @RequestParam("nombre_com") String nombre,
            @RequestParam("coment") String texto
    ) {
        Map<String, Object> response = new HashMap<>();

        nombre = nombre == null ? "" : nombre.trim();
        texto = texto == null ? "" : texto.trim();

        if (nombre.length() < 3 || nombre.length() > 80) {
            response.put("exito", false);
            response.put("mensaje", "Nombre debe tener entre 3 y 80 caracteres.");
            return ResponseEntity.badRequest().body(response);
        }

        if (texto.length() < 5) {
            response.put("exito", false);
            response.put("mensaje", "Comentario debe tener al menos 5 caracteres.");
            return ResponseEntity.badRequest().body(response);
        }

        Actividad actividad = actividadService.getById(actividadId).orElse(null);
        if (actividad == null) {
            response.put("exito", false);
            response.put("mensaje", "Actividad no encontrada.");
            return ResponseEntity.badRequest().body(response);
        }

        Comentario nuevoComentario = new Comentario();
        nuevoComentario.setNombre(nombre);
        nuevoComentario.setTexto(texto);
        nuevoComentario.setFecha(LocalDateTime.now());
        nuevoComentario.setActividad(actividad);

        try {
            comentarioService.save(nuevoComentario);

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

            response.put("exito", true);
            response.put("mensaje", "Comentario agregado.");
            response.put("nombre", nombre);
            response.put("texto", texto);
            response.put("fecha", nuevoComentario.getFecha().format(formatter));

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("exito", false);
            response.put("mensaje", "Error con base de datos: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}
