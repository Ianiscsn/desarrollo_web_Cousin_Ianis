package app.demo.service;

import app.demo.model.Foto;
import app.demo.repository.FotoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FotoService {
    @Autowired
    private FotoRepository fotoRepository;

    public List<Foto> getAll() {
        return fotoRepository.findAll();
    }

    public Optional<Foto> getById(Integer id) {
        return fotoRepository.findById(id);
    }

    public Foto save(Foto foto) {
        return fotoRepository.save(foto);
    }

    public void delete(Integer id) {
        fotoRepository.deleteById(id);
    }
}
