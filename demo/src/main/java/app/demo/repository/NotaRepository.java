package app.demo.repository;

import app.demo.model.Nota;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface NotaRepository extends JpaRepository<Nota, Integer> {
    @Query("SELECT n.actividad.id, AVG(n.nota) FROM Nota n GROUP BY n.actividad.id")
    List<Object[]> promedioNota();

    @Query("SELECT AVG(n.nota) FROM Nota n WHERE n.actividad.id = :actividadId")
    Double promedioNotaId(Integer actividadId);
}
