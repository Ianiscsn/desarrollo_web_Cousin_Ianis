package app.demo.service;

import app.demo.model.ActividadTema;
import app.demo.repository.ActividadTemaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActividadTemaService {
    @Autowired
    private ActividadTemaRepository actividadTemaRepository;

    public List<ActividadTema> getAll() {
        return actividadTemaRepository.findAll();
    }

    public Optional<ActividadTema> getById(Integer id) {
        return actividadTemaRepository.findById(id);
    }

    public ActividadTema save(ActividadTema tema) {
        return actividadTemaRepository.save(tema);
    }

    public void delete(Integer id) {
        actividadTemaRepository.deleteById(id);
    }
}
