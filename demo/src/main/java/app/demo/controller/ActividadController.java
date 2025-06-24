package app.demo.controller;

import app.demo.model.*;
import app.demo.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.*;

@Controller
@RequestMapping("/actividad")
public class ActividadController {

    @Autowired
    private ActividadService actividadService;
    @Autowired
    private ComunaService comunaService;
    @Autowired
    private ActividadTemaService actividadTemaService;
    @Autowired
    private ContactarPorService contactarPorService;
    @Autowired
    private FotoService fotoService;

    
    @GetMapping("/agregar")
    public String mostrarFormulario(Model model) {
        List<Object> info = new ArrayList<>(Collections.nCopies(13, ""));
            info.set(10,new HashMap<String, String>());
            info.set(11,new ArrayList<String>());
            model.addAttribute("info", info);
        return "Agregar_actividad";  
    }

    @PostMapping("/agregar")
    public String agregarActividad(
        
            @RequestParam("región") String regionNombre,
            @RequestParam("comuna") String comunaNombre,
            @RequestParam("sector") String sector,
            @RequestParam("nombre") String nombre,
            @RequestParam("email") String email,
            @RequestParam("tel") String celular,
            @RequestParam("date_in") String diaHoraInicio,
            @RequestParam(value = "date_ter", required = false) String diaHoraTermino,
            @RequestParam("descripción") String descripcion,
            @RequestParam(value = "contact_method", required = false) List<String> contactMethods,
            @RequestParam Map<String, String> allParams,
            @RequestParam(value = "temas", required = false) List<String> temas,
            RedirectAttributes redirectAttributes,
            Model model
    ) {
        String comunaNombre2 = comunaNombre.substring(0, 1).toUpperCase() + comunaNombre.substring(1);
        
        List<String> base64List = new ArrayList<>();
        List<String> fileNames = new ArrayList<>();

        for (int i = 0; i < 5; i++) {
            String b64 = allParams.get("photoBase64_" + i);
            String fn = allParams.get("fileName_" + i);
            if (b64 != null && fn != null) {
                base64List.add(b64);
                fileNames.add(fn);
            }
        }

        Map<String, String> contactInfo = new HashMap<>();
        if (contactMethods != null) {
            for (String method : contactMethods) {
                String key = method + "_id";
                if (allParams.containsKey(key)) {
                    contactInfo.put(method, allParams.get(key));
                }
            }
        }

        String temOtra = "";
        if (temas != null) {
            for (String tema : temas) {
                if ("otra-tema".equals(tema)) {
                    temOtra = allParams.getOrDefault("otra-tema_id", "");
                    break;
                }
            }
        }

        List<String> errores = new ArrayList<>();

        if ("none".equals(regionNombre) || regionNombre == null || regionNombre.isBlank()) {
            errores.add("Region invalido");
        }
        if ("none".equals(comunaNombre) || comunaNombre == null || comunaNombre.isBlank()) {
            errores.add("Comuna invalido");
        }
        if (sector != null && sector.length() > 100) {
            errores.add("Sector invalido");
        }
        if (nombre == null || nombre.isBlank() || nombre.length() > 200) {
            errores.add("Nombre invalido");
        }
        if (email == null || email.isBlank() || email.length() > 100 || 
            !email.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")) {
            errores.add("Email invalido");
        }
        if (celular != null && !celular.isBlank() && 
            !celular.matches("^\\+\\d{3}\\.\\d{8}$")) {
            errores.add("Tel invalido");
        }
        if (contactInfo != null) {
            if (contactInfo.size() > 5) {
                errores.add("Contact invalido");
            }
            for (Map.Entry<String, String> entry : contactInfo.entrySet()) {
                String val = entry.getValue();
                if (val == null || val.length() < 4 || val.length() > 50) {
                    errores.add("Contact_id invalido");
                }
            }
        }
        LocalDateTime dtIn = null;
        try {
            dtIn = LocalDateTime.parse(diaHoraInicio);
        } catch (DateTimeParseException e) {
            errores.add("Date_in invalido");
        }
        if (diaHoraTermino != null && !diaHoraTermino.isBlank()) {
            try {
                LocalDateTime dtTer = LocalDateTime.parse(diaHoraTermino);
                if (dtIn != null && dtTer.isBefore(dtIn)) {
                    errores.add("Date_ter invalido");
                }
            } catch (DateTimeParseException e) {
                errores.add("Date_ter invalido");
            }
        }
        if (temas == null || temas.isEmpty()) {
            errores.add("Tema invalido");
        }
        if (temOtra != null && !temOtra.isBlank()) {
            if (temOtra.length() < 3 || temOtra.length() > 15) {
                errores.add("Tema_otro invalido");
            }
        }
        if (base64List == null || base64List.size() < 1 || base64List.size() > 6) {
            errores.add("Fotos invalido");
        }
        

        if (!errores.isEmpty()) {
            model.addAttribute("mensaje", String.join(", ", errores));
            List<Object> info = new ArrayList<>(Collections.nCopies(13, ""));
            info.set(0, regionNombre);
            info.set(1, comunaNombre);
            info.set(2, sector);
            info.set(3, nombre);
            info.set(4, email);
            info.set(5, celular);
            info.set(6, diaHoraInicio);
            info.set(7, diaHoraTermino != null ? diaHoraTermino : "");
            info.set(8, descripcion);
            info.set(9, "");
            info.set(10,contactInfo);
            info.set(11,temas);
            info.set(12,temOtra != "" ? temOtra : "");
            model.addAttribute("info", info);
            return "Agregar_actividad";
        }

        Optional<Comuna> comunaOpt = comunaService.getAll().stream()
                .filter(c -> c.getNombre().equals(comunaNombre2))
                .findFirst();

        if (comunaOpt.isEmpty()) {
            model.addAttribute("mensaje", "Comuna no encontrada");
            List<Object> info = new ArrayList<>(Collections.nCopies(13, ""));
            info.set(0, regionNombre);
            info.set(1, comunaNombre);
            info.set(2, sector);
            info.set(3, nombre);
            info.set(4, email);
            info.set(5, celular);
            info.set(6, diaHoraInicio);
            info.set(7, diaHoraTermino != null ? diaHoraTermino : "");
            info.set(8, descripcion);
            info.set(9, "");
            info.set(10,contactInfo);
            info.set(11,temas);
            info.set(12,temOtra != "" ? temOtra : "");
            model.addAttribute("info", info);
            return "Agregar_actividad";
        }

        Comuna comuna = comunaOpt.get();

        Actividad actividad = new Actividad();
        actividad.setComuna(comuna);
        actividad.setSector(sector);
        actividad.setNombre(nombre);
        actividad.setEmail(email);
        actividad.setCelular(celular);
        actividad.setDiaHoraInicio(java.time.LocalDateTime.parse(diaHoraInicio));
        if (diaHoraTermino != null && !diaHoraTermino.isBlank()) {
            actividad.setDiaHoraTermino(java.time.LocalDateTime.parse(diaHoraTermino));
        }
        actividad.setDescripcion(descripcion);
        actividad = actividadService.save(actividad);

        if (temas != null) {
            for (String tema : temas) {
                ActividadTema actividadTema = new ActividadTema();
                actividadTema.setActividad(actividad);
                actividadTema.setTema(tema);
                if ("otra-tema".equals(tema)) {
                    actividadTema.setGlosaOtro(temOtra);
                }
                actividadTemaService.save(actividadTema);
            }
        }

        for (Map.Entry<String, String> entry : contactInfo.entrySet()) {
            ContactarPor cp = new ContactarPor();
            cp.setActividad(actividad);
            cp.setNombre(entry.getKey());
            cp.setIdentificador(entry.getValue());
            contactarPorService.save(cp);
        }
        
        
        for (int i = 0; i < base64List.size(); i++) {
            String photoBase64 = base64List.get(i);
            String fileName = fileNames.get(i);
            if (photoBase64 != "") {
                try {
                    String base64Image = photoBase64.split(",")[1];
                    byte[] imageBytes = Base64.getDecoder().decode(base64Image);
                    Path targetDir = Paths.get("demo/src/main/resources/static", "imagen")
                                        .toAbsolutePath()
                                        .normalize();

                    String uniqueFilename = UUID.randomUUID() + "_" + fileName;
                    Path targetPath = targetDir.resolve(uniqueFilename);
                    Files.write(targetPath, imageBytes);

                    Foto foto = new Foto();
                    foto.setActividad(actividad); 
                    foto.setNombreArchivo(uniqueFilename);
                    foto.setRutaArchivo("/static/imagen/" + uniqueFilename);
                    fotoService.save(foto);
                } catch (IOException e) {
                    throw new RuntimeException("Erreur lors de la copie du fichier: " + e.getMessage());
                } catch (ArrayIndexOutOfBoundsException e) {
                    throw new RuntimeException("Format base64 invalide pour la photo index " + i);
                }
            }
        }         

        redirectAttributes.addFlashAttribute("mensaje", "Actividad agregado");
        return "redirect:/index";
    }
}
