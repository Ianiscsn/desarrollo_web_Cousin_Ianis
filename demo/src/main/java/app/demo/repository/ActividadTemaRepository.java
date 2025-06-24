package app.demo.repository;

import app.demo.model.ActividadTema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActividadTemaRepository extends JpaRepository<ActividadTema, Integer> {
}
