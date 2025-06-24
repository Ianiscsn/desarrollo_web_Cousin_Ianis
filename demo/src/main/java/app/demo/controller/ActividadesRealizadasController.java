package app.demo.controller;

import app.demo.model.Actividad;
import app.demo.model.Nota;
import app.demo.repository.ActividadRepository;
import app.demo.service.ActividadService;
import app.demo.service.NotaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.*;

@Controller
@RequestMapping("/actividades")
public class ActividadesRealizadasController {

    @Autowired
    private ActividadService actividadService;

    @Autowired
    private NotaService notaService;

    @Autowired
    private ActividadRepository actividadRepository;

    @GetMapping("/realizadas")
    public String mostrarActividadesRealizadas(Model model) {
        LocalDateTime ahora = LocalDateTime.now();
        List<Actividad> actividades = actividadService.findByDiaHoraTerminoBefore(ahora);

        Map<Integer, Double> promedios = notaService
                .promedioNotas();

        model.addAttribute("actividades", actividades);
        model.addAttribute("promedios", promedios);

        return "Actividades_realizadas";
    }

    @PostMapping("/agregar_nota")
    public ResponseEntity<Map<String, Object>> agregarNota(@RequestBody Map<String, Object> payload) {
        Map<String, Object> response = new HashMap<>();

        try {
            Integer actId = Integer.valueOf(payload.get("id").toString());
            int nota = Integer.parseInt(payload.get("nota").toString());

            if (nota < 1 || nota > 7) {
                response.put("exito", false);
                response.put("mensaje", "Nota debe estar entre 1 y 7");
                return ResponseEntity.badRequest().body(response);
            }
            
            Actividad actividad = actividadRepository.findById(actId)
    .orElseThrow(() -> new RuntimeException("Actividad no encontrada"));
            Nota nuevaNota = new Nota();
            nuevaNota.setActividad(actividad);
            nuevaNota.setNota(nota);

            notaService.save(nuevaNota);

            double promedio = notaService.promedioNotasId(actId);

            response.put("exito", true);
            response.put("premedio", Math.round(promedio * 100.0) / 100.0);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            response.put("exito", false);
            response.put("mensaje", "Error al guardar nota: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}
