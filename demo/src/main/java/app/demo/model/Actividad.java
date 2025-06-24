package app.demo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "actividad")
public class Actividad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "comuna_id", nullable = false)
    private Comuna comuna;

    @Column(length = 100)
    private String sector;

    @Column(nullable = false, length = 200)
    private String nombre;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(length = 15)
    private String celular;

    @Column(name = "dia_hora_inicio", nullable = false)
    private LocalDateTime diaHoraInicio;

    @Column(name = "dia_hora_termino")
    private LocalDateTime diaHoraTermino;

    @Column(length = 500)
    private String descripcion;

    @OneToMany(mappedBy = "actividad", cascade = CascadeType.ALL)
    private Set<Foto> fotos;

    @OneToMany(mappedBy = "actividad", cascade = CascadeType.ALL)
    private Set<ActividadTema> temas;

    @OneToMany(mappedBy = "actividad", cascade = CascadeType.ALL)
    private Set<ContactarPor> contact;

    @OneToMany(mappedBy = "actividad", cascade = CascadeType.ALL)
    private Set<Comentario> comentario;

    @OneToMany(mappedBy = "actividad", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Nota> notas;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Comuna getComuna() { return comuna; }
    public void setComuna(Comuna comuna) { this.comuna = comuna; }

    public String getSector() { return sector; }
    public void setSector(String sector) { this.sector = sector; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getCelular() { return celular; }
    public void setCelular(String celular) { this.celular = celular; }

    public LocalDateTime getDiaHoraInicio() { return diaHoraInicio; }
    public void setDiaHoraInicio(LocalDateTime diaHoraInicio) { this.diaHoraInicio = diaHoraInicio; }

    public LocalDateTime getDiaHoraTermino() { return diaHoraTermino; }
    public void setDiaHoraTermino(LocalDateTime diaHoraTermino) { this.diaHoraTermino = diaHoraTermino; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public Set<Foto> getFotos() { return fotos; }
    public void setFotos(Set<Foto> fotos) { this.fotos = fotos; }

    public Set<ActividadTema> getTemas() { return temas; }
    public void setTemas(Set<ActividadTema> temas) { this.temas = temas; }

    public Set<ContactarPor> getContact() { return contact; }
    public void setContact(Set<ContactarPor> contact) { this.contact = contact; }

    public Set<Comentario> getComentario() { return comentario; }
    public void setComentario(Set<Comentario> comentario) { this.comentario = comentario; }

    public Set<Nota> getNotas() { return notas; }
    public void setNotas(Set<Nota> notas) { this.notas = notas; }
}
