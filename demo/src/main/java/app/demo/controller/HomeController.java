package app.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import app.demo.model.Actividad;
import app.demo.service.ActividadService;

@Controller
public class HomeController {
    @Autowired
    private ActividadService actividadService;

    @GetMapping({"/", "/index"})
    public String afficherIndex(@RequestParam(value = "mensaje", required = false) String mensaje, Model model) {
        if (mensaje != null && !mensaje.isBlank()) {
            model.addAttribute("mensaje", mensaje);
        }
        List<Actividad> lista = actividadService.getAll();
        model.addAttribute("actividades", lista);
        return "index";
    }
}