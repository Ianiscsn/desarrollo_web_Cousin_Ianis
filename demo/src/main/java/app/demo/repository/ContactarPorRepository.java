package app.demo.repository;

import app.demo.model.ContactarPor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactarPorRepository extends JpaRepository<ContactarPor, Integer> {
}
