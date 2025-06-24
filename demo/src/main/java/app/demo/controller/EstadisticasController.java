package app.demo.controller;

import app.demo.service.ActividadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.tuple.Pair;

@Controller
public class EstadisticasController {

    @Autowired
    private ActividadService actividadService;

    @GetMapping("/estadisticas")
    public String mostrarEstadisticas() {
        return "Estadisticas";  
    }

    @GetMapping("/estat")
    @ResponseBody
    public List<Object> getEstadisticas() {
        List<Integer> g1 = actividadService.getGraf1();
        System.out.println(g1);

        List<Map<String, Object>> graf1 = List.of(Map.of("name", "Actividades", "data", g1));

        Pair<List<Integer>, Integer> g2 = actividadService.getGraf2();
        System.out.println(g2);

        List<Map<String, Object>> graf2 = List.of(
            Map.of("name", "música", "y", g2.getLeft().get(0) / (double) g2.getRight()),
            Map.of("name", "deporte", "y", g2.getLeft().get(1) / (double) g2.getRight()),
            Map.of("name", "ciencias", "y", g2.getLeft().get(2) / (double) g2.getRight()),
            Map.of("name", "religión", "y", g2.getLeft().get(3) / (double) g2.getRight()),
            Map.of("name", "política", "y", g2.getLeft().get(4) / (double) g2.getRight()),
            Map.of("name", "tecnología", "y", g2.getLeft().get(5) / (double) g2.getRight()),
            Map.of("name", "juegos", "y", g2.getLeft().get(6) / (double) g2.getRight()),
            Map.of("name", "baile", "y", g2.getLeft().get(7) / (double) g2.getRight()),
            Map.of("name", "comida", "y", g2.getLeft().get(8) / (double) g2.getRight()),
            Map.of("name", "otro", "y", g2.getLeft().get(9) / (double) g2.getRight())
        );

        List<List<Integer>> g3 = actividadService.getGraf3();
        System.out.println(g3);

        List<Map<String, Object>> graf3 = List.of(
            Map.of("name", "Manana", "data", g3.get(0)),
            Map.of("name", "Mediodia", "data", g3.get(1)),
            Map.of("name", "Tarde", "data", g3.get(2))
        );
        return List.of(graf1, graf2, graf3);
    }
}
