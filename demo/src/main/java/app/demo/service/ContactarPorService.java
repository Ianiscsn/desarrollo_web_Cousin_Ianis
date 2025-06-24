package app.demo.service;

import app.demo.model.ContactarPor;
import app.demo.repository.ContactarPorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactarPorService {
    @Autowired
    private ContactarPorRepository contactarPorRepository;

    public List<ContactarPor> getAll() {
        return contactarPorRepository.findAll();
    }

    public Optional<ContactarPor> getById(Integer id) {
        return contactarPorRepository.findById(id);
    }

    public ContactarPor save(ContactarPor contacto) {
        return contactarPorRepository.save(contacto);
    }

    public void delete(Integer id) {
        contactarPorRepository.deleteById(id);
    }
}
