package app.demo.service;

import app.demo.model.Comuna;
import app.demo.repository.ComunaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComunaService {
    @Autowired
    private ComunaRepository comunaRepository;

    public List<Comuna> getAll() {
        return comunaRepository.findAll();
    }

    public Optional<Comuna> getById(Integer id) {
        return comunaRepository.findById(id);
    }

    public Comuna save(Comuna comuna) {
        return comunaRepository.save(comuna);
    }

    public void delete(Integer id) {
        comunaRepository.deleteById(id);
    }
}
