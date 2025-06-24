package app.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "actividad_tema")
public class ActividadTema {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String tema;

    @Column(name = "glosa_otro", length = 15)
    private String glosaOtro;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "actividad_id", nullable = false)
    private Actividad actividad;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getTema() { return tema; }
    public void setTema(String tema2) { this.tema = tema2; }

    public String getGlosaOtro() { return glosaOtro; }
    public void setGlosaOtro(String glosaOtro) { this.glosaOtro = glosaOtro; }

    public Actividad getActividad() { return actividad; }
    public void setActividad(Actividad actividad) { this.actividad = actividad; }
}