package app.demo.controller;

import app.demo.model.Actividad;
import app.demo.service.ActividadService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class ListadosController {

    @Autowired
    private ActividadService actividadService;

    @GetMapping("/listados_actividades")
    public String listarActividades(
            Model model,
            @RequestParam(defaultValue = "1") int page
    ) {
        int perPage = 5;
        Page<Actividad> actividadesPage = actividadService.findAllWithRelations(PageRequest.of(page - 1, perPage));

        model.addAttribute("actividades", actividadesPage.getContent());
        model.addAttribute("page", page);
        model.addAttribute("total_pages", actividadesPage.getTotalPages());

        return "Listados_actividades"; 
    }


    @GetMapping("/listados_actividades/informacion/{id}")
    public String mostrarInformacion(
            @PathVariable("id") Integer id,
            Model model
    ) {
        Actividad actividad = actividadService.findByIdWithDetails(id);
        model.addAttribute("actividad", actividad);
        return "información";  
    }
}
