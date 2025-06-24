package app.demo.repository;

import app.demo.model.Actividad;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface ActividadRepository extends JpaRepository<Actividad, Integer> {

    @EntityGraph(attributePaths = {"fotos", "temas", "comuna"})
    Page<Actividad> findAll(Pageable pageable);

    @Query("SELECT a FROM Actividad a " +
           "LEFT JOIN FETCH a.fotos " +
           "LEFT JOIN FETCH a.temas " +
           "LEFT JOIN FETCH a.contact " +
           "LEFT JOIN FETCH a.comuna c " +
           "LEFT JOIN FETCH c.region " +
           "LEFT JOIN FETCH a.comentario " +
           "WHERE a.id = :id")
    Optional<Actividad> findByIdWithDetails(Integer id);

    List<Actividad> findByDiaHoraTerminoBefore(LocalDateTime now);
}
