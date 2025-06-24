package app.demo.service;

import app.demo.model.Actividad;
import app.demo.model.ActividadTema;
import app.demo.repository.ActividadRepository;
import app.demo.repository.ActividadTemaRepository;

import org.apache.commons.lang3.tuple.ImmutablePair;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ActividadService {

    @Autowired
    private ActividadRepository actividadRepository;

    @Autowired
    private ActividadTemaRepository actividadTemaRepository;

    public List<Actividad> getAll() {
        return actividadRepository.findAll();
    }

    public Optional<Actividad> getById(Integer id) {
        return actividadRepository.findById(id);
    }

    public Actividad save(Actividad actividad) {
        return actividadRepository.save(actividad);
    }

    public void delete(Integer id) {
        actividadRepository.deleteById(id);
    }

    public List<Integer> getGraf1() {
        List<Actividad> actividades = actividadRepository.findAll();
        List<Integer> counts = new ArrayList<>(List.of(0, 0, 0, 0, 0, 0, 0));

        for (Actividad act : actividades) {
            LocalDateTime fecha = act.getDiaHoraInicio();
            if (fecha != null) {
                DayOfWeek day = fecha.getDayOfWeek();
                counts.set(day.getValue() - 1, counts.get(day.getValue() - 1) + 1);
            }
        }
        return counts;
    }

    public Pair<List<Integer>, Integer> getGraf2() {
        List<ActividadTema> temas = actividadTemaRepository.findAll();
        List<String> listaTemas = List.of("música", "deporte", "ciencias", "religión", "política", "tecnología", "juegos", "baile", "comida", "otro");
        List<Integer> counts = new ArrayList<>();
        for (int i = 0; i < listaTemas.size(); i++) {
            counts.add(0);
        }

        for (ActividadTema tema : temas) {
            String nombreTema = tema.getTema();
            int index = listaTemas.indexOf(nombreTema);
            if (index != -1) {
                counts.set(index, counts.get(index) + 1);
            }
        }
        int total = temas.size();
        return new ImmutablePair<>(counts, total);
    }

    public List<List<Integer>> getGraf3() {
        List<Actividad> actividades = actividadRepository.findAll();
        List<Integer> manana = new ArrayList<>();
        List<Integer> mediodia = new ArrayList<>();
        List<Integer> tarde = new ArrayList<>();

        for (int i = 0; i < 12; i++) {
            manana.add(0);
            mediodia.add(0);
            tarde.add(0);
        }
        

        for (Actividad act : actividades) {
            LocalDateTime fecha = act.getDiaHoraInicio();
            if (fecha != null) {
                int monthIndex = fecha.getMonthValue() - 1;
                int hour = fecha.getHour();
                if (hour < 12) {
                    manana.set(monthIndex, manana.get(monthIndex) + 1);
                } else if (hour >= 12 && hour < 18) {
                    mediodia.set(monthIndex, mediodia.get(monthIndex) + 1);
                } else {
                    tarde.set(monthIndex, tarde.get(monthIndex) + 1);
                }
            }
        }

        List<List<Integer>> result = new ArrayList<>();
        result.add(manana);
        result.add(mediodia);
        result.add(tarde);
        return result;
    }

    public Page<Actividad> findAllWithRelations(Pageable pageable) {
        return actividadRepository.findAll(pageable);
    }

    public Actividad findByIdWithDetails(Integer id) {
        Optional<Actividad> optionalActividad = actividadRepository.findByIdWithDetails(id);
        return optionalActividad.orElse(null);
    }

    public List<Actividad> findByDiaHoraTerminoBefore(LocalDateTime now) {
        return actividadRepository.findByDiaHoraTerminoBefore(now);
    }
}
