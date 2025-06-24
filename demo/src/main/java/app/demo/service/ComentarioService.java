package app.demo.service;

import app.demo.model.Comentario;
import app.demo.repository.ComentarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComentarioService {
    @Autowired
    private ComentarioRepository comentarioRepository;

    public List<Comentario> getAll() {
        return comentarioRepository.findAll();
    }

    public Optional<Comentario> getById(Integer id) {
        return comentarioRepository.findById(id);
    }

    public Comentario save(Comentario comentario) {
        return comentarioRepository.save(comentario);
    }

    public void delete(Integer id) {
        comentarioRepository.deleteById(id);
    }
}
