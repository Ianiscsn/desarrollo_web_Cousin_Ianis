package app.demo.service;

import app.demo.model.Nota;
import app.demo.repository.NotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NotaService {
    @Autowired
    private NotaRepository notaRepository;

    public List<Nota> getAll() {
        return notaRepository.findAll();
    }

    public Optional<Nota> getById(Integer id) {
        return notaRepository.findById(id);
    }

    public Nota save(Nota nota) {
        return notaRepository.save(nota);
    }

    public void delete(Integer id) {
        notaRepository.deleteById(id);
    }

    public Map<Integer, Double> promedioNotas() {
        return notaRepository.promedioNota()
                .stream()
                .collect(Collectors.toMap(
                        obj -> (Integer) obj[0],
                        obj -> (Double) obj[1]
                ));
    }

    public double promedioNotasId(Integer actividadId) {
        Double promedio = notaRepository.promedioNotaId(actividadId);
        return promedio != null ? promedio : 0.0;
    }
}
