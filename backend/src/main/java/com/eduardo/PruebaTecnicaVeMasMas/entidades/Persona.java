package com.eduardo.PruebaTecnicaVeMasMas.entidades;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "persona")
@Getter
@Setter
@NoArgsConstructor
public class Persona{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private String apellidoPaterno;

    @Column(nullable = false)
    private String apellidoMaterno;

    @Column(unique = true, nullable = false, length = 18)
    private String curp;

    @Column(unique = true, nullable = false, length = 13)
    private String rfc;

    @Column(nullable = false)
    private LocalDate fechaNacimiento;

    @Column(nullable = false)
    private String correoElectronico;

    @Column(nullable = false)
    private String telefono;
}