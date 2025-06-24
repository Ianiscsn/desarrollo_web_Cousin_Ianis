package app.demo.service;

import app.demo.model.Region;
import app.demo.repository.RegionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RegionService {
    @Autowired
    private RegionRepository regionRepository;

    public List<Region> getAll() {
        return regionRepository.findAll();
    }

    public Optional<Region> getById(Integer id) {
        return regionRepository.findById(id);
    }

    public Region save(Region region) {
        return regionRepository.save(region);
    }

    public void delete(Integer id) {
        regionRepository.deleteById(id);
    }
}
